"use client";

import { FOOTER_COLUMNS } from "../constants/footer-links";
import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterColumn } from "./footer-column";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t bg-muted/30">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <FooterBrand />
          </div>

          <div className="col-span-2 flex gap-8 justify-between md:flex-row flex-col">
            {FOOTER_COLUMNS.map((column) => (
              <FooterColumn key={column.title} column={column} />
            ))}
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
