import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import Fireworks from "../components/Fireworks";

/* =========================
   MENU STRUCTURE
========================= */
const navigation = [
  { name: "Home", href: "/" },
  { name: "Community", href: "/community" },
  {
    name: "Projects",
    children: [
      {
        name: "Games",
        children: [
          { name: "Vinrex Game", href: "/vinrex/index.html" },
          { name: "Snake Game", href: "/snekabsurd" },
          { name: "Bola Ajaib", href: "/bola-ajaib" },
          { name: "DOOM", href: "/doom" },
          { name: "Click Me", href: "/gabut" },
        ],
      },
      {
        name: "Books",
        children: [{ name: "Guest Book", href: "/guestbook" }],
      },
      {
        name: "Tools",
        children: [{ name: "SVG Steganography Tool", href: "/nbrthx" }],
      },
      {
        name: "Others",
        children: [{ name: "Femboy", href: "/ayuAtama/rent-femboy" }],
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [fireworksOn, setFireworksOn] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Disclosure
        as="nav"
        className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-gray-800 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-2">
              <DisclosureButton className="sm:hidden rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white">
                <Bars3Icon className="h-6 w-6 data-open:hidden" />
                <XMarkIcon className="h-6 w-6 hidden data-open:block" />
              </DisclosureButton>

              <Link href="/" className="flex items-center gap-2">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Logo"
                  className="h-8 w-auto"
                />
                <span className="font-semibold text-white">The Website</span>
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden sm:flex items-center gap-6">
              {navigation.map((item) => {
                if (!item.children) {
                  const active = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        active
                          ? "text-white border-b-2 border-indigo-500"
                          : "text-gray-300 hover:text-white",
                        "pb-1 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }

                /* PROJECTS DROPDOWN */
                return (
                  <div key={item.name} className="relative group">
                    <button className="pb-1 text-sm font-medium text-gray-300 hover:text-white">
                      {item.name}
                    </button>

                    {/* LEVEL 1 */}
                    <div
                      className="
                      absolute left-0 top-full mt-2 w-56
                      rounded-md bg-gray-800 dark:bg-gray-900 shadow-lg
                      opacity-0 invisible pointer-events-none
                      group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                      transition-opacity duration-200
                      before:absolute before:-top-3 before:left-0 before:h-3 before:w-full
                    "
                    >
                      {item.children.map((level2) => (
                        <div
                          key={level2.name}
                          className="relative group/level2"
                        >
                          <div className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                            {level2.name}
                            <span>›</span>
                          </div>

                          {/* LEVEL 2 */}
                          <div
                            className="
                            absolute left-full top-0 w-64
                            rounded-md bg-gray-800 dark:bg-gray-900 shadow-lg
                            opacity-0 invisible pointer-events-none
                            group-hover/level2:opacity-100
                            group-hover/level2:visible
                            group-hover/level2:pointer-events-auto
                            transition-opacity duration-200 delay-75
                            before:absolute before:left-[-12px] before:top-0 before:w-3 before:h-full
                          "
                          >
                            {level2.children.map((level3) => (
                              <Link
                                key={level3.name}
                                href={level3.href}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                              >
                                {level3.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {/* FIREWORKS BUTTON */}
              <button
                onClick={() => setFireworksOn((v) => !v)}
                className={classNames(
                  fireworksOn
                    ? "text-emerald-400 hover:bg-emerald-400/10"
                    : "text-gray-400 hover:bg-white/10",
                  "rounded-full p-2 transition"
                )}
                aria-label="Toggle fireworks"
                title="Toggle fireworks"
              >
                <RocketLaunchIcon className="h-6 w-6" />
              </button>

              {/* THEME TOGGLE */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => {
              if (!item.children) {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      active
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              }

              /* PROJECTS MOBILE */
              return (
                <Disclosure key={item.name}>
                  <>
                    <DisclosureButton className="flex w-full justify-between rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white">
                      {item.name}
                      <span>+</span>
                    </DisclosureButton>

                    <DisclosurePanel className="pl-4">
                      {item.children.map((level2) => (
                        <Disclosure key={level2.name}>
                          <>
                            <DisclosureButton className="flex w-full justify-between rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                              {level2.name}
                              <span>+</span>
                            </DisclosureButton>

                            <DisclosurePanel className="pl-4">
                              {level2.children.map((level3) => (
                                <Link
                                  key={level3.name}
                                  href={level3.href}
                                  className="block rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
                                >
                                  {level3.name}
                                </Link>
                              ))}
                            </DisclosurePanel>
                          </>
                        </Disclosure>
                      ))}
                    </DisclosurePanel>
                  </>
                </Disclosure>
              );
            })}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {/* FIREWORKS GLOBAL */}
      <Fireworks enabled={fireworksOn} />
    </>
  );
}
