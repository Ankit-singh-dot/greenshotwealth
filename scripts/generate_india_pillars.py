import math
import os
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Canvas: 1600 x 2000 (aspect 4:5)
W, H = 1600, 2000

# Fonts
FONT_SERIF_BOLD = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
FONT_SERIF_REG = '/System/Library/Fonts/Supplemental/Georgia.ttf'
FONT_SANS_TTC = '/System/Library/Fonts/HelveticaNeue.ttc'

def get_font(path, size, index=0):
    try:
        if path.endswith('.ttc'):
            return ImageFont.truetype(path, size, index=index)
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# Typography
f_super = get_font(FONT_SANS_TTC, 17, index=1)
f_title = get_font(FONT_SERIF_BOLD, 46)
f_sub = get_font(FONT_SANS_TTC, 19, index=0)

f_num = get_font(FONT_SERIF_BOLD, 38)
f_tag = get_font(FONT_SANS_TTC, 12, index=1)
f_c_title = get_font(FONT_SANS_TTC, 22, index=1)
f_desc = get_font(FONT_SANS_TTC, 14, index=0)

f_footer_l = get_font(FONT_SANS_TTC, 14, index=0)
f_footer_r = get_font(FONT_SANS_TTC, 14, index=1)

def get_gold_tree_logo(target_size=115):
    """Loads Green Shoots Wealth official tree logo and tints it to warm gold."""
    im = Image.open('public/logo_tree.png').convert('RGBA')
    bbox = im.getbbox()
    im = im.crop(bbox)
    w, h = im.size
    target_w = int(w * (target_size / h))
    im = im.resize((target_w, target_size), Image.Resampling.LANCZOS)
    gold = Image.new('RGBA', (target_w, target_size), '#C5A963')
    r, g, b, a = im.split()
    gold.putalpha(a)
    return gold

def build_official_india_map(target_h=1530):
    """
    Renders the complete, uncut Survey of India boundary (full Jammu, Kashmir & Ladakh crown)
    with the financial skyscrapers perspective composited down the central spine.
    """
    with open('/tmp/india.geojson') as f:
        data = json.load(f)
    geom = data['features'][0]['geometry']
    polys = geom['coordinates']
    max_pts = 0
    mainland_poly = None
    for p in polys:
        pts = p[0]
        if len(pts) > max_pts:
            max_pts = len(pts)
            mainland_poly = pts

    downsampled = mainland_poly[::20]
    if downsampled[-1] != mainland_poly[-1]:
        downsampled.append(mainland_poly[-1])

    lons = [pt[0] for pt in downsampled]
    lats = [pt[1] for pt in downsampled]
    min_lon, max_lon = min(lons), max(lons)
    min_lat, max_lat = min(lats), max(lats)

    mid_lat = math.radians((min_lat + max_lat) / 2.0)
    cos_mid = math.cos(mid_lat)

    px_pts = []
    for lon, lat in downsampled:
        x = (lon - min_lon) * cos_mid
        y = (max_lat - lat)
        px_pts.append((x, y))

    xs = [p[0] for p in px_pts]
    ys = [p[1] for p in px_pts]
    span_x = max(xs) - min(xs)
    span_y = max(ys) - min(ys)

    scale = target_h / span_y
    target_w = int(span_x * scale)

    map_pts = [
        ((x - min(xs)) * scale, (y - min(ys)) * scale)
        for x, y in px_pts
    ]

    # Official boundary mask
    mask_im = Image.new('L', (target_w, target_h), 0)
    m_draw = ImageDraw.Draw(mask_im)
    m_draw.polygon(map_pts, fill=255)

    # Luminous Warm Gold Gradient Base for India
    gold_map = Image.new('RGB', (target_w, target_h), (197, 169, 99))
    gm_draw = ImageDraw.Draw(gold_map)
    for y in range(target_h):
        p = y / float(target_h)
        gr = int(225 * (1 - p) + 185 * p)
        gg = int(195 * (1 - p) + 155 * p)
        gb = int(120 * (1 - p) + 85 * p)
        gm_draw.line([(0, y), (target_w, y)], fill=(gr, gg, gb))

    # Load sample skyscrapers
    sample_path = '/Users/ankitsingh/.gemini/antigravity/brain/a6f109b2-f037-496e-bf38-16523f9c0fa7/.user_uploaded/media_1795189262895_145589c2.jpg'
    s_im = Image.open(sample_path).convert('RGB')
    s_arr = np.array(s_im, dtype=float)

    r, g, b = s_arr[:,:,0], s_arr[:,:,1], s_arr[:,:,2]
    is_orange = (r > 135) & (g > 35) & (g < 155) & (b < 65)
    is_bldg = (~is_orange) & (r > 15) & (g > 15) & (b > 15) & (np.abs(r - g) < 25)

    # Tint sample: where it was orange or non-building background, tint to warm gold
    gold_tint_arr = np.zeros_like(s_arr)
    for yi in range(s_arr.shape[0]):
        for xi in range(s_arr.shape[1]):
            if is_bldg[yi, xi]:
                gold_tint_arr[yi, xi] = s_arr[yi, xi]
            else:
                gold_tint_arr[yi, xi] = [215, 185, 110]

    # Crop central skyscraper avenue (strictly x: 210 to 375 to avoid card 5 artifacts)
    bldg_crop = Image.fromarray(gold_tint_arr[140:622, 210:375].astype(np.uint8))
    target_bh = int(target_h * 0.77)
    target_bw = int(bldg_crop.size[0] * (target_bh / float(bldg_crop.size[1])))
    scaled_bldg = bldg_crop.resize((target_bw, target_bh), Image.Resampling.LANCZOS)

    bottom_pt = max(map_pts, key=lambda pt: pt[1])
    bldg_x = int(bottom_pt[0] - target_bw * 0.46)
    bldg_y = int(bottom_pt[1] - target_bh + 6)

    # 4-sided feathering mask for buildings
    b_mask = np.ones((target_bh, target_bw), dtype=float) * 255.0
    fade_top = 110
    for fi in range(fade_top):
        b_mask[fi, :] *= (fi / float(fade_top))
    fade_l = 40
    for fi in range(fade_l):
        b_mask[:, fi] *= (fi / float(fade_l))
    fade_r = 45
    for fi in range(fade_r):
        b_mask[:, target_bw - 1 - fi] *= (fi / float(fade_r))

    b_mask_im = Image.fromarray(b_mask.astype(np.uint8))
    gold_map.paste(scaled_bldg, (bldg_x, bldg_y), b_mask_im)

    # Composite inside official India boundary
    composite_map = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    composite_map.paste(gold_map, (0, 0), mask_im)

    # Draw crisp glowing gold boundary
    c_draw = ImageDraw.Draw(composite_map)
    c_draw.line(map_pts, fill='#F0DCAB', width=3)

    return composite_map

def main():
    # 1. Base canvas: Luxury Deep Forest Night
    canvas = Image.new('RGBA', (W, H), '#08140E')
    draw = ImageDraw.Draw(canvas)

    # Atmospheric vertical gradient
    for y in range(H):
        p = y / float(H)
        r = int(10 * (1 - p) + 6 * p)
        g = int(24 * (1 - p) + 14 * p)
        b = int(16 * (1 - p) + 9 * p)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # Outer luxury framing
    ox1, oy1, ox2, oy2 = 45, 45, W - 45, H - 45
    draw.rounded_rectangle([ox1, oy1, ox2, oy2], radius=26, outline=(197, 169, 99, 45), width=1)

    # 2. Top-Left Header: The Title
    draw.text((90, 85), "WHAT WE CAN HELP YOU BUILD", font=f_super, fill="#C5A963")
    draw.text((90, 120), "Growing Wealth Across Indian Markets", font=f_title, fill="#F5F1E8")
    draw.text((92, 185), "Curated investment solutions mapped to your family's goals, timeline & risk horizon.", font=f_sub, fill="#A3BCAC")

    # 3. Top-Right: OUR LOGO ONLY (Strictly emblem only, no name or company text!)
    logo = get_gold_tree_logo(115)
    logo_x = W - 90 - logo.size[0]
    logo_y = 80
    medallion_pad = 14
    draw.ellipse([logo_x - medallion_pad, logo_y - medallion_pad, 
                  logo_x + logo.size[0] + medallion_pad, logo_y + logo.size[1] + medallion_pad], 
                 fill=(16, 38, 27, 220), outline=(197, 169, 99, 90), width=1)
    canvas.paste(logo, (logo_x, logo_y), logo)

    # 4. Center: Complete Official India Map (Full Crown & Skyscraper Avenue)
    india_map = build_official_india_map(target_h=1530)
    map_x = (W - india_map.size[0]) // 2
    map_y = 260
    canvas.paste(india_map, (map_x, map_y), india_map)

    # 5. The 8 Solutions Cards (4 on Left, 4 on Right)
    # Sleek frosted glass callouts: NO blurry drop-shadow halo, NO web buttons, NO fake divider lines!
    card_w = 415
    card_h = 210
    gap_y = 145
    start_y = 310

    cards_data = [
        # Left Flank: 01 to 04
        {
            "num": "01",
            "tag": "MUTUAL FUNDS",
            "title": "Mutual Funds",
            "desc": "Diversified, professionally managed portfolios across large, mid, and multi-cap horizons.",
            "pos": (80, start_y + 0 * (card_h + gap_y))
        },
        {
            "num": "02",
            "tag": "SIP SOLUTIONS",
            "title": "SIP Solutions",
            "desc": "Disciplined compounding through systematic monthly contributions tailored to key milestones.",
            "pos": (80, start_y + 1 * (card_h + gap_y))
        },
        {
            "num": "03",
            "tag": "DIRECT EQUITY",
            "title": "Equity Investments",
            "desc": "Direct participation in India's structural economic growth through curated equity themes.",
            "pos": (80, start_y + 2 * (card_h + gap_y))
        },
        {
            "num": "04",
            "tag": "FIXED INCOME",
            "title": "Debt & Fixed Income",
            "desc": "Capital preservation, regular income yield, and defensive stability across market cycles.",
            "pos": (80, start_y + 3 * (card_h + gap_y))
        },
        # Right Flank: 05 to 08
        {
            "num": "05",
            "tag": "MULTI-ASSET",
            "title": "Hybrid & Multi-Asset",
            "desc": "Dynamic asset allocation across equity, debt, commodities, and precious metals.",
            "pos": (W - 80 - card_w, start_y + 0 * (card_h + gap_y))
        },
        {
            "num": "06",
            "tag": "SPECIALIZED FUNDS",
            "title": "Specialized Funds (SIF)",
            "desc": "Regulated, high-conviction alternative investment strategies tailored for eligible investors.",
            "pos": (W - 80 - card_w, start_y + 1 * (card_h + gap_y))
        },
        {
            "num": "07",
            "tag": "WEALTH PROTECTION",
            "title": "Insurance Planning",
            "desc": "Protect family lifestyle, business continuity, and legacy assets against unforeseen risks.",
            "pos": (W - 80 - card_w, start_y + 2 * (card_h + gap_y))
        },
        {
            "num": "08",
            "tag": "LEGACY & RETIREMENT",
            "title": "Retirement Planning",
            "desc": "Structured financial independence and generational wealth preservation built to last.",
            "pos": (W - 80 - card_w, start_y + 3 * (card_h + gap_y))
        }
    ]

    for c in cards_data:
        x, y = c["pos"]

        # Clean anti-aliased frosted glass card layer: NO blurry shadow halo!
        card_layer = Image.new('RGBA', (card_w, card_h), (0, 0, 0, 0))
        cl_draw = ImageDraw.Draw(card_layer)
        cl_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, 
                                 fill=(8, 20, 14, 215), outline=(197, 169, 99, 140), width=1)
        canvas.paste(card_layer, (x, y), card_layer)

        # Header Row: Large Gold Number on left, Category Tag on right
        draw.text((x + 24, y + 20), c["num"], font=f_num, fill="#C5A963")
        draw.text((x + 88, y + 28), c["tag"], font=f_tag, fill=(197, 169, 99, 200))

        # Title
        draw.text((x + 24, y + 76), c["title"], font=f_c_title, fill="#F5F1E8")

        # Description text wrapping
        words = c["desc"].split()
        lines = []
        cur_line = []
        for w in words:
            test_line = " ".join(cur_line + [w])
            if draw.textlength(test_line, font=f_desc) <= (card_w - 48):
                cur_line.append(w)
            else:
                lines.append(" ".join(cur_line))
                cur_line = [w]
        if cur_line:
            lines.append(" ".join(cur_line))

        dy = y + 116
        for l in lines:
            draw.text((x + 24, dy), l, font=f_desc, fill="#A3BCAC")
            dy += 22

    # 6. Bottom Clean Footer
    draw.line([(75, 1880), (W - 75, 1880)], fill=(197, 169, 99, 45), width=1)
    draw.text((80, 1910), "GREEN SHOOTS WEALTH · STRATEGIC ASSET ALLOCATION IN INDIA", font=f_footer_r, fill="#C5A963")
    draw.text((W - 550, 1910), "FIDUCIARY DISCIPLINE · TAILORED FOR GENERATIONS", font=f_footer_l, fill="#7A9784")

    # Export outputs
    rgb_canvas = canvas.convert('RGB')
    paths = [
        "public/images/indian_investing_advisory_4x5.webp",
        "public/images/indian_investing_advisory_4x5.jpg",
    ]

    for p in paths:
        if p.endswith('.webp'):
            canvas.save(p, 'WEBP', quality=95, method=6)
        else:
            rgb_canvas.save(p, 'JPEG', quality=95, optimize=True)
        print(f"Generated: {p} ({os.path.getsize(p)} bytes)")

if __name__ == '__main__':
    main()
