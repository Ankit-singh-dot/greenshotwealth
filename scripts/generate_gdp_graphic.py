import math
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 2000

# Fonts
FONT_SERIF_BOLD = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
FONT_SERIF_ITALIC = '/System/Library/Fonts/Supplemental/Georgia Italic.ttf'
FONT_SERIF_REG = '/System/Library/Fonts/Supplemental/Georgia.ttf'
FONT_SANS_TTC = '/System/Library/Fonts/HelveticaNeue.ttc'

def get_font(path, size, index=0):
    try:
        if path.endswith('.ttc'):
            return ImageFont.truetype(path, size, index=index)
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# Preload fonts
f_header_title = get_font(FONT_SERIF_BOLD, 28)
f_header_sub = get_font(FONT_SANS_TTC, 13, index=1)
f_badge = get_font(FONT_SANS_TTC, 14, index=1)

f_sec_eyebrow = get_font(FONT_SANS_TTC, 16, index=1)
f_sec_title = get_font(FONT_SERIF_ITALIC, 42)

f_country_bold = get_font(FONT_SANS_TTC, 25, index=1)
f_country_reg = get_font(FONT_SANS_TTC, 23, index=0)
f_country_sub = get_font(FONT_SANS_TTC, 14, index=0)

f_val_bold = get_font(FONT_SERIF_BOLD, 32)
f_val_reg = get_font(FONT_SANS_TTC, 26, index=1)

f_takeaway_num = get_font(FONT_SERIF_BOLD, 46)
f_takeaway_h = get_font(FONT_SANS_TTC, 21, index=1)
f_takeaway_p = get_font(FONT_SANS_TTC, 16, index=0)

f_footer = get_font(FONT_SANS_TTC, 15, index=0)
f_footer_bold = get_font(FONT_SANS_TTC, 15, index=1)

def make_circle_flag(im, border=(197, 169, 99, 230)):
    s = im.size[0]
    mask = Image.new('L', (s, s), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([1, 1, s-2, s-2], fill=255)
    out = Image.new('RGBA', (s, s), (0,0,0,0))
    out.paste(im, (0,0), mask)
    d2 = ImageDraw.Draw(out)
    d2.ellipse([1, 1, s-2, s-2], outline=border, width=max(2, s//40))
    return out

def generate_flag(code, s=128):
    im = Image.new('RGBA', (s, s), '#1B2C24')
    d = ImageDraw.Draw(im)
    if code == 'IND':
        h = s / 3.0
        d.rectangle([0, 0, s, h], fill='#FF9933')
        d.rectangle([0, h, s, 2*h], fill='#FFFFFF')
        d.rectangle([0, 2*h, s, s], fill='#138808')
        cx, cy, r = s/2, s/2, h * 0.42
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline='#000088', width=max(2, s//64))
        for i in range(24):
            ang = i * (2*math.pi / 24)
            d.line([cx, cy, cx + r*math.cos(ang), cy + r*math.sin(ang)], fill='#000088', width=max(1, s//128))
        d.ellipse([cx-r*0.2, cy-r*0.2, cx+r*0.2, cy+r*0.2], fill='#000088')
    elif code == 'CHN':
        d.rectangle([0, 0, s, s], fill='#DE2910')
        cx, cy, r = s*0.22, s*0.25, s*0.12
        d.ellipse([cx-r, cy-r, cx+r, cy+r], fill='#FFDE00')
        for pos in [(0.4, 0.12), (0.48, 0.22), (0.48, 0.35), (0.4, 0.45)]:
            sx, sy = s*pos[0], s*pos[1]
            d.ellipse([sx-r*0.35, sy-r*0.35, sx+r*0.35, sy+r*0.35], fill='#FFDE00')
    elif code == 'USA':
        sh = s / 13.0
        for i in range(13):
            d.rectangle([0, i*sh, s, (i+1)*sh], fill='#B22234' if i%2==0 else '#FFFFFF')
        cw, ch = s * 0.5, sh * 7
        d.rectangle([0, 0, cw, ch], fill='#1A355E')
        for r_idx in range(5):
            for c_idx in range(6):
                sx = (c_idx + 0.6) * (cw / 6.2)
                sy = (r_idx + 0.6) * (ch / 5.2)
                d.ellipse([sx-2, sy-2, sx+2, sy+2], fill='#FFFFFF')
    elif code == 'BRA':
        d.rectangle([0, 0, s, s], fill='#009739')
        pts = [(s/2, s*0.1), (s*0.9, s/2), (s/2, s*0.9), (s*0.1, s/2)]
        d.polygon(pts, fill='#FEDD00')
        cr = s * 0.25
        d.ellipse([s/2-cr, s/2-cr, s/2+cr, s/2+cr], fill='#012169')
        d.arc([s/2-cr, s/2-cr, s/2+cr, s/2+cr], start=190, end=350, fill='#FFFFFF', width=max(2, s//40))
    elif code == 'G7':
        d.rectangle([0, 0, s, s], fill='#0B4F8A')
        d.ellipse([s*0.15, s*0.15, s*0.85, s*0.85], outline='#FFFFFF', width=max(2, s//50))
        d.ellipse([s*0.35, s*0.15, s*0.65, s*0.85], outline='#FFFFFF', width=max(2, s//50))
        d.line([s*0.15, s*0.5, s*0.85, s*0.5], fill='#FFFFFF', width=max(2, s//50))
        d.line([s*0.5, s*0.15, s*0.5, s*0.85], fill='#FFFFFF', width=max(2, s//50))
    elif code == 'EUR':
        d.rectangle([0, 0, s, s], fill='#003399')
        for i in range(12):
            ang = i * (2*math.pi / 12)
            sx = s/2 + s*0.32 * math.cos(ang)
            sy = s/2 + s*0.32 * math.sin(ang)
            d.ellipse([sx-3, sy-3, sx+3, sy+3], fill='#FFCC00')
    elif code == 'JPN':
        d.rectangle([0, 0, s, s], fill='#FFFFFF')
        cr = s * 0.28
        d.ellipse([s/2-cr, s/2-cr, s/2+cr, s/2+cr], fill='#BC002D')
    return make_circle_flag(im)

def get_gold_tree_logo(target_h=72):
    im = Image.open('public/logo_tree.png').convert('RGBA')
    bbox = im.getbbox()
    im = im.crop(bbox)
    w, h = im.size
    target_w = int(w * (target_h / h))
    im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    gold = Image.new('RGBA', (target_w, target_h), '#C5A963')
    r, g, b, a = im.split()
    gold.putalpha(a)
    return gold

def main():
    canvas = Image.new('RGBA', (W, H), '#0D1E15')
    draw = ImageDraw.Draw(canvas)

    # Smooth luxury gradient
    for y in range(H):
        p = y / float(H)
        r = int(16 * (1 - p) + 10 * p)
        g = int(36 * (1 - p) + 22 * p)
        b = int(26 * (1 - p) + 16 * p)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # Outer clean frame - minimal single hairline
    fx1, fy1, fx2, fy2 = 55, 55, W - 55, H - 55
    draw.rounded_rectangle([fx1, fy1, fx2, fy2], radius=32, outline=(197, 169, 99, 50), width=1)

    # 1. Header (y: 95 to 180)
    logo = get_gold_tree_logo(68)
    canvas.paste(logo, (95, 95), logo)

    draw.text((178, 102), "GREEN SHOOTS WEALTH", font=f_header_title, fill="#F5F1E8")
    draw.text((180, 140), "GLOBAL MACRO & STRATEGIC ASSET ALLOCATION", font=f_header_sub, fill="#C5A963")

    # Top right pill badge
    badge_text = "●  FY26 MACRO OUTLOOK"
    bx2 = fx2 - 40
    bw = 250
    bx1 = bx2 - bw
    by1, by2 = 108, 150
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=21, fill=(20, 42, 31, 220), outline=(197, 169, 99, 80), width=1)
    draw.text((bx1 + 22, by1 + 10), badge_text, font=f_badge, fill="#C5A963")

    # 2. Clean Title & Context (y: 215 to 330)
    draw.text((95, 215), "REAL GDP GROWTH PROJECTIONS (%)", font=f_sec_eyebrow, fill="#C5A963")
    draw.text((95, 248), "Why global diversification balances domestic growth.", font=f_sec_title, fill="#F5F1E8")

    # 3. Central Chart Card (y: 350 to 1490)
    cx1, cy1, cx2, cy2 = 90, 350, W - 90, 1490
    draw.rounded_rectangle([cx1, cy1, cx2, cy2], radius=28, fill=(16, 34, 25, 240), outline=(35, 68, 50, 180), width=1)

    # 7 Key Benchmarks
    DATA = [
        {
            "code": "IND",
            "name": "India",
            "sub": "Fastest-Growing Major Economy",
            "rate": 7.70,
            "type": "india"
        },
        {
            "code": "CHN",
            "name": "China",
            "sub": "Emerging Asian Peer",
            "rate": 4.90,
            "type": "peer"
        },
        {
            "code": "USA",
            "name": "United States",
            "sub": "Global Currency & World Tech Monopolies",
            "rate": 2.30,
            "type": "us"
        },
        {
            "code": "BRA",
            "name": "Brazil",
            "sub": "Commodity & Emerging Market",
            "rate": 2.00,
            "type": "peer"
        },
        {
            "code": "G7",
            "name": "G7 / OECD Average",
            "sub": "Developed Market Baseline",
            "rate": 1.70,
            "type": "peer"
        },
        {
            "code": "EUR",
            "name": "Euro Area",
            "sub": "European Union Bloc",
            "rate": 1.30,
            "type": "peer"
        },
        {
            "code": "JPN",
            "name": "Japan",
            "sub": "Mature Asian Economy",
            "rate": 0.80,
            "type": "peer"
        },
    ]

    row_start_y = cy1 + 80
    row_gap = 148
    bar_x1 = 570
    bar_x2 = cx2 - 170
    max_rate = 8.5
    bar_max_w = bar_x2 - bar_x1

    for i, row in enumerate(DATA):
        yc = row_start_y + i * row_gap

        # Flag badge (54x54 px) centered vertically at yc
        flag = generate_flag(row["code"], s=128)
        flag = flag.resize((54, 54), Image.Resampling.LANCZOS)
        canvas.paste(flag, (cx1 + 42, yc - 27), flag)

        # Country label & sub aligned cleanly
        is_ind = row["type"] == "india"
        is_us = row["type"] == "us"
        c_name_col = "#FFFFFF" if (is_ind or is_us) else "#C8D9CE"
        
        draw.text((cx1 + 115, yc - 22), row["name"], font=f_country_bold if (is_ind or is_us) else f_country_reg, fill=c_name_col)
        draw.text((cx1 + 117, yc + 10), row["sub"], font=f_country_sub, fill="#839E8C")

        # Bar track (Height: 32px, centered at yc)
        by = yc - 16
        bh = 32
        draw.rounded_rectangle([bar_x1, by, bar_x2, by + bh], radius=16, fill=(24, 46, 35, 255))

        # Filled bar
        bw = int(bar_max_w * (row["rate"] / max_rate))
        bar_rect = [bar_x1, by, bar_x1 + bw, by + bh]

        if row["type"] == "india":
            # Gold gradient
            for bx in range(bw):
                p = bx / float(bw)
                gr = int(228 * (1 - p * 0.16))
                gg = int(196 * (1 - p * 0.16))
                gb = int(116 * (1 - p * 0.16))
                draw.line([(bar_x1 + bx, by), (bar_x1 + bx, by + bh)], fill=(gr, gg, gb, 255))
            draw.rounded_rectangle([bar_rect[0], by, bar_rect[2], by + bh], radius=16, outline="#FFE29A", width=1)
        elif row["type"] == "us":
            # Emerald gradient
            for bx in range(bw):
                p = bx / float(bw)
                gr = int(68 * (1 + p * 0.2))
                gg = int(160 * (1 - p * 0.1))
                gb = int(105 * (1 - p * 0.1))
                draw.line([(bar_x1 + bx, by), (bar_x1 + bx, by + bh)], fill=(gr, gg, gb, 255))
            draw.rounded_rectangle([bar_rect[0], by, bar_rect[2], by + bh], radius=16, outline="#72E0A4", width=1)
        else:
            # Sage gradient for peers
            for bx in range(bw):
                p = bx / float(bw)
                gr = int(88 * (1 - p * 0.2))
                gg = int(128 * (1 - p * 0.2))
                gb = int(104 * (1 - p * 0.2))
                draw.line([(bar_x1 + bx, by), (bar_x1 + bx, by + bh)], fill=(gr, gg, gb, 255))
            draw.rounded_rectangle([bar_rect[0], by, bar_rect[2], by + bh], radius=16, outline=(100, 145, 120, 80), width=1)

        # Percentage text (centered vertically at yc)
        val_str = f"{row['rate']:.1f}%" if row['rate'] != 7.7 else "7.70%"
        if row["type"] == "india":
            draw.text((cx2 - 135, yc - 20), "7.70%", font=f_val_bold, fill="#E5CB88")
        elif row["type"] == "us":
            draw.text((cx2 - 135, yc - 20), "2.30%", font=f_val_bold, fill="#5DC78B")
        else:
            draw.text((cx2 - 135, yc - 16), val_str, font=f_val_reg, fill="#D1DDD5")

    # 4. Clean Bottom Takeaway Card (y: 1530 to 1830)
    tx1, ty1, tx2, ty2 = cx1, 1530, cx2, 1830
    draw.rounded_rectangle([tx1, ty1, tx2, ty2], radius=24, fill=(18, 38, 28, 255), outline=(38, 72, 53, 180), width=1)

    # Column 1: India Engine
    c1_x = tx1 + 55
    draw.text((c1_x, ty1 + 35), "7.70%", font=f_takeaway_num, fill="#C5A963")
    draw.text((c1_x, ty1 + 105), "India Domestic Engine", font=f_takeaway_h, fill="#F5F1E8")
    draw.text((c1_x, ty1 + 142), "High capital appreciation driven by demographic dividends\nand India's long-term manufacturing & consumption cycle.", font=f_takeaway_p, fill="#98B2A1")

    # Divider
    div_x = tx1 + (tx2 - tx1) // 2
    draw.line([(div_x, ty1 + 35), (div_x, ty2 - 35)], fill=(197, 169, 99, 45), width=1)

    # Column 2: Global Diversification
    c2_x = div_x + 55
    draw.text((c2_x, ty1 + 35), "USD & Global", font=f_takeaway_num, fill="#4EA773")
    draw.text((c2_x, ty1 + 105), "Currency & Tech Shield", font=f_takeaway_h, fill="#F5F1E8")
    draw.text((c2_x, ty1 + 142), "Direct ownership in world-dominant AI & semiconductor monopolies,\ndefending family purchasing power against currency depreciation.", font=f_takeaway_p, fill="#98B2A1")

    # 5. Footer (y: 1880)
    draw.line([(fx1 + 30, 1875), (fx2 - 30, 1875)], fill=(197, 169, 99, 40), width=1)
    
    draw.text((fx1 + 35, 1905), "Source: IMF World Economic Outlook (WEO) & MoSPI · Verified Macro Data", font=f_footer, fill="#6E8B78")
    
    f_r_text = "GREEN SHOOTS WEALTH · FIDUCIARY GLOBAL ADVISORY"
    f_r_w = draw.textlength(f_r_text, font=f_footer_bold)
    draw.text((fx2 - f_r_w - 35, 1905), f_r_text, font=f_footer_bold, fill="#C5A963")

    # Save outputs
    print("Generating ultra-clean aligned outputs...")
    rgb_canvas = canvas.convert('RGB')
    
    paths = [
        "public/images/india_gdp_growth.webp",
        "public/images/india_gdp_growth.jpg",
        "public/images/india_gdp_growth_4x5.webp",
        "public/images/india_gdp_growth_4x5.jpg"
    ]
    
    for p in paths:
        if p.endswith('.webp'):
            canvas.save(p, 'WEBP', quality=95, method=6)
        else:
            rgb_canvas.save(p, 'JPEG', quality=95, optimize=True)
        print(f"Generated: {p} ({os.path.getsize(p)} bytes)")

if __name__ == '__main__':
    main()
