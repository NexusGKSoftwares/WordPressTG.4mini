"use client"

import { useEffect, useRef } from "react"

interface ThemePreviewProps {
  theme: {
    code: string
    specification: {
      styles: any
      layout_structure: any
    }
  }
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDocument) {
        // Create a basic HTML structure
        iframeDocument.open()
        iframeDocument.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                ${theme.specification.styles}
              </style>
            </head>
            <body>
              ${theme.code}
            </body>
          </html>
        `)
        iframeDocument.close()
      }
    }
  }, [theme])

  return <iframe ref={iframeRef} className="w-full h-full min-h-[600px] rounded-lg border" title="Theme Preview" />
}

