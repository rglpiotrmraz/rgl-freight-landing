import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="https://img2.gimm.io/6cb3626c-e7fc-4185-bf1a-8236cccf1c51/-/resize/266x186/img.png"
            alt="RGL Logistics Network logo"
            width={140}
            height={98}
            className="h-auto"
            priority={false}
          />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Contact Column */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 border-b-2 border-gray-700 pb-2 mb-4">
              Contact
            </h2>
            <address className="not-italic space-y-1 text-sm text-gray-600">
              <p className="font-medium text-gray-900">Piotr Mraz</p>
              <p>
                <a
                  href="mailto:p.mraz@rgl.com.pl"
                  className="hover:text-black transition-colors underline underline-offset-2"
                >
                  p.mraz@rgl.com.pl
                </a>
              </p>
              <p>
                <a
                  href="tel:+48577930002"
                  className="hover:text-black transition-colors"
                >
                  +48 577 930 002
                </a>
              </p>
              <p>
                <a
                  href="https://www.rgl.com.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors underline underline-offset-2"
                >
                  www.rgl.com.pl
                </a>
              </p>
            </address>
          </div>

          {/* Business Info Column */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 border-b-2 border-gray-700 pb-2 mb-4">
              Business Info
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="font-medium text-gray-900">RGL Robert Gajewski</p>
              <p>ul. Krakowska 28a</p>
              <p>45-018 Opole</p>
              <p>NIP: PL7532000665</p>
              <p>Timocom ID: 330086</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2026 RGL Logistics Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
