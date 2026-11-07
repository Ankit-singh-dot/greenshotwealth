"use client";

import React from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  title?: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${
            toast.type === "success"
              ? "bg-[#183124]/95 text-white border-[#2e543f] shadow-[#1F3A2C]/20"
              : toast.type === "error"
              ? "bg-[#331114]/95 text-white border-rose-800/60 shadow-rose-950/20"
              : "bg-[#202924]/95 text-white border-gray-700/60 shadow-black/20"
          }`}
          style={{ animation: "toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Icon */}
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              toast.type === "success"
                ? "bg-[#8fa868]/20 text-[#8fa868] border border-[#8fa868]/30"
                : toast.type === "error"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }`}
          >
            {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            {toast.title && (
              <h4 className="text-xs font-semibold tracking-wide uppercase text-white/90 font-sans">
                {toast.title}
              </h4>
            )}
            <p className="text-xs text-white/80 font-sans leading-relaxed mt-0.5">
              {toast.message}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/40 hover:text-white text-xs p-1 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#ded8cb] transform transition-all"
        style={{ animation: "modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              isDestructive
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : "bg-[#EEF0D9] text-[#1F3A2C] border border-[#ded8cb]"
            }`}
          >
            {isDestructive ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="font-serif text-xl font-normal text-[#1F3A2C]">
              {title}
            </h3>
            <p className="text-xs text-[#5f7366] leading-relaxed font-sans">
              {message}
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-[#1F3A2C] hover:bg-[#14281e] text-white"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

