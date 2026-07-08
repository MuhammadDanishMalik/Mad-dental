export interface ProductFeature {
  title: string;
  desc: string;
}

export interface ProductStep {
  label: string;
  desc: string;
}

export interface ApplicationGuide {
  title: string;
  steps: ProductStep[];
  proTip?: string;
}

export interface RichSection {
  title: string;
  intro: string;
  whyLoveIt?: ProductFeature[];
  appGuide?: ApplicationGuide;
}

export interface Product {
  id: string;
  handle: string;
  badge: string;
  image: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  salePrice: number;
  bundleHeading: string;
  bundleDesc: string;
  sections: RichSection[];
}

export const products: Product[] = [
  {
    id: "1",
    handle: "free-mad-teeth-whitening-foam-with-mad-dental-pro-white-strips-mad-teeth-whitening-powder-highly-recommended-20-extra-discount",
    badge: "Sale",
    image: "/pack3.webp",
    title: "3 in one get 20% off on this Deal, 🔥 EXCLUSIVE BUNDLE DEAL🔥",
    subtitle: "PAKISTAN'S NO 1",
    originalPrice: 4880,
    salePrice: 3000,
    bundleHeading: "🔥 EXCLUSIVE BUNDLE DEAL: 20% EXTRA DISCOUNT! 🔥",
    bundleDesc:
      "Get a **FREE Foam** when you purchase our highly recommended combo:  **Strips + Powder**.",
    sections: [
      {
        title: "Pro Strips",
        intro:
          "Achieve a dentist-quality, radiant smile from the comfort of your home in just half an hour! Powered by cutting-edge **6% Hydrogen Peroxide technology**, these premium strips safely and effectively erase deep-set stains from smoking, coffee, tea, and daily wear. Crafted to meet global cosmetic safety standards, Dental—Pakistan's rapidly expanding luxury oral care brand—delivers striking results without the hefty price tag of professional clinics.",
        whyLoveIt: [
          {
            title: "Rapid Results:",
            desc: "Expert-level whitening in a swift, 30-minute session.",
          },
          {
            title: "Visible Brightness:",
            desc: "Noticeably whiter teeth after just 7 applications.",
          },
          {
            title: "Stain Eraser:",
            desc: "Specifically formulated to combat stubborn modern lifestyle stains (coffee, tea, tobacco).",
          },
          {
            title: "Enamel-Safe:",
            desc: "A gentle, cosmetic blend designed to protect your teeth.",
          },
          {
            title: "Hassle-Free:",
            desc: "Convenient and incredibly simple to apply at home.",
          },
        ],
        appGuide: {
          title: "🦷 Application Guide (Strips)",
          steps: [
            {
              label: "Prep:",
              desc: "Ensure your teeth are thoroughly brushed and completely dry.",
            },
            {
              label: "Apply Top:",
              desc: "Peel the backing from the longer strip and place it across your upper teeth. Press firmly, folding any excess behind the teeth to secure it.",
            },
            {
              label: "Apply Bottom:",
              desc: "Repeat the process with the shorter strip on your lower teeth.",
            },
            {
              label: "Wait:",
              desc: "Let the strips sit undisturbed for exactly 30 minutes.",
            },
            {
              label: "Remove:",
              desc: "Peel off and safely discard the strips.",
            },
          ],
          proTip:
            "For maximum brightness, use once daily for 7 consecutive days. Avoid consuming coffee, tea, or smoking immediately after treatment.",
        },
      },
      {
        title: "Teeth Whitening Powder",
        intro:
          "Frustrated by yellow or stained teeth? Keep your smile brilliantly white while still enjoying your favorite foods and beverages. Revamp your smile in three easy steps!",
        appGuide: {
          title: "🦷 Application Guide (Powder)",
          steps: [
            {
              label: "Dip & Coat:",
              desc: "Gently dip your damp toothbrush into the powder. Use the included spill tray for zero mess to get an even coat.",
            },
            {
              label: "Brush:",
              desc: "Brush your teeth gently in circular motions for 2 minutes, focusing on stained areas.",
            },
            {
              label: "Rinse:",
              desc: "Rinse thoroughly with water. Use twice daily for best results.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "2",
    handle: "teeth-whitening-foam-highly-recommended-20-extra-discount-copy",
    badge: "Sale",
    image: "/powder.webp",
    title: "Get 20% Extra 🔥 EXCLUSIVE BUNDLE DEAL🔥",
    subtitle: "PAKISTAN'S NO 1",
    originalPrice: 1590,
    salePrice: 990,
    bundleHeading: "🔥 EXCLUSIVE BUNDLE DEAL: 20% EXTRA DISCOUNT! 🔥",
    bundleDesc: "Mad Dental Whitening Foam – **Enamel-Safe Formula**. 50ml mint flavoured foam for a thorough whitening experience.",
    sections: [
      {
        title: "Ultra Whitening Foam",
        intro:
          "Our unique whitening foam reaches deep between teeth for a comprehensive whitening experience. Powered by cutting-edge **6% Hydrogen Peroxide technology**, our foam safely and effectively erases deep-set stains.",
        whyLoveIt: [
          { title: "Rapid Results:", desc: "Visibly whiter teeth in just 30 minutes." },
          { title: "Enamel-Safe:", desc: "Gentle cosmetic blend that protects your enamel." },
          { title: "Mint Fresh:", desc: "Leaves your breath fresh and clean." },
        ],
        appGuide: {
          title: "🦷 Application Guide (Foam)",
          steps: [
            { label: "Prep:", desc: "Ensure teeth are thoroughly brushed and dry." },
            { label: "Apply:", desc: "Dispense a small amount of foam onto your toothbrush." },
            { label: "Brush:", desc: "Brush gently for 2 minutes covering all surfaces." },
            { label: "Rinse:", desc: "Rinse thoroughly with water." },
          ],
          proTip: "Use daily for 7 consecutive days for best results.",
        },
      },
    ],
  },
  {
    id: "3",
    handle: "pack-of-3-teeth-whitening-powder-highly-recommended-20-extra-discount-copy-copy",
    badge: "Sale",
    image: "/foam.webp",
    title: "get extra 40% on PACKof one get 20% off on this Deal, 🔥 EXCLUSIVE BUNDLE DEAL🔥",
    subtitle: "PAKISTAN'S NO 1",
    originalPrice: 1590,
    salePrice: 1090,
    bundleHeading: "🔥 EXCLUSIVE BUNDLE DEAL: 40% EXTRA DISCOUNT! 🔥",
    bundleDesc: "Mad Dental **Ultra Whitening Foam** – Enamel-Safe Formula. 50ml / 1.7oz Mint Flavoured.",
    sections: [
      {
        title: "Ultra Whitening Foam",
        intro:
          "Achieve a radiant smile from the comfort of your home. Powered by cutting-edge **6% Hydrogen Peroxide technology**, this foam safely erases deep-set stains from smoking, coffee, tea, and daily wear.",
        whyLoveIt: [
          { title: "Rapid Results:", desc: "Expert-level whitening in a swift, 30-minute session." },
          { title: "Visible Brightness:", desc: "Noticeably whiter teeth after just 7 applications." },
          { title: "Stain Eraser:", desc: "Formulated to combat stubborn lifestyle stains." },
          { title: "Enamel-Safe:", desc: "A gentle, cosmetic blend to protect your teeth." },
        ],
        appGuide: {
          title: "🦷 Application Guide (Foam)",
          steps: [
            { label: "Prep:", desc: "Ensure teeth are clean and dry." },
            { label: "Apply:", desc: "Dispense foam onto toothbrush." },
            { label: "Brush:", desc: "Brush for 2 minutes in circular motions." },
            { label: "Rinse:", desc: "Rinse thoroughly with water." },
          ],
          proTip: "Use once daily for 7 days for maximum brightness.",
        },
      },
    ],
  },
  {
    id: "4",
    handle: "pack-of-2-teeth-whitening-powder-highly-recommended-20-extra-discount-copy",
    badge: "Sale",
    image: "/pack2promo.png",
    title: "Pack of Three, 3 in one get 20% off on this Deal, 🔥 EXCLUSIVE BUNDLE DEAL🔥",
    subtitle: "PAKISTAN'S NO 1",
    originalPrice: 3890,
    salePrice: 2260,
    bundleHeading: "🔥 EXCLUSIVE BUNDLE DEAL: 20% EXTRA DISCOUNT! 🔥",
    bundleDesc:
      "Get a **FREE Foam** when you purchase our highly recommended combo:  **Strips + Powder**.",
    sections: [
      {
        title: "Pro Strips",
        intro:
          "Achieve a dentist-quality, radiant smile from the comfort of your home in just half an hour! Powered by cutting-edge **6% Hydrogen Peroxide technology**, these premium strips safely and effectively erase deep-set stains.",
        whyLoveIt: [
          { title: "Rapid Results:", desc: "Expert-level whitening in a swift, 30-minute session." },
          { title: "Visible Brightness:", desc: "Noticeably whiter teeth after just 7 applications." },
          { title: "Stain Eraser:", desc: "Specifically formulated to combat stubborn lifestyle stains." },
          { title: "Enamel-Safe:", desc: "A gentle, cosmetic blend designed to protect your teeth." },
          { title: "Hassle-Free:", desc: "Convenient and incredibly simple to apply at home." },
        ],
        appGuide: {
          title: "🦷 Application Guide (Strips)",
          steps: [
            { label: "Prep:", desc: "Ensure your teeth are thoroughly brushed and completely dry." },
            { label: "Apply Top:", desc: "Peel the backing from the longer strip and place it across your upper teeth. Press firmly, folding any excess behind the teeth." },
            { label: "Apply Bottom:", desc: "Repeat the process with the shorter strip on your lower teeth." },
            { label: "Wait:", desc: "Let the strips sit undisturbed for exactly 30 minutes." },
            { label: "Remove:", desc: "Peel off and safely discard the strips." },
          ],
          proTip: "For maximum brightness, use once daily for 7 consecutive days. Avoid consuming coffee, tea, or smoking immediately after treatment.",
        },
      },
      {
        title: "Teeth Whitening Powder",
        intro:
          "Frustrated by yellow or stained teeth? Keep your smile brilliantly white while still enjoying your favorite foods and beverages. Revamp your smile in three easy steps!",
        appGuide: {
          title: "🦷 Application Guide (Powder)",
          steps: [
            { label: "Dip & Coat:", desc: "Gently dip your damp toothbrush into the powder. Use the included spill tray for zero mess." },
            { label: "Brush:", desc: "Brush your teeth gently in circular motions for 2 minutes." },
            { label: "Rinse:", desc: "Rinse thoroughly with water. Use twice daily for best results." },
          ],
        },
      },
    ],
  },
  {
    id: "5",
    handle: "teeth-whitening-powder-highly-recommended-20-extra-discount-copy",
    badge: "Sale",
    image: "/pack2.png",
    title: "Pack of Two, 2 in one get 15% off on this Deal, 🔥 EXCLUSIVE BUNDLE DEAL🔥",
    subtitle: "PAKISTAN'S NO 1",
    originalPrice: 2580,
    salePrice: 1990,
    bundleHeading: "🔥 EXCLUSIVE BUNDLE DEAL: 15% EXTRA DISCOUNT! 🔥",
    bundleDesc: "Mad Dental **Pack of 2** – Double the whitening power with two Teeth Whitening Powder jars.",
    sections: [
      {
        title: "Teeth Whitening Powder",
        intro:
          "Frustrated by yellow or stained teeth? Keep your smile brilliantly white while still enjoying your favorite foods and beverages. Two jars means longer-lasting results at an unbeatable bundle price.",
        whyLoveIt: [
          { title: "Rapid Results:", desc: "Visibly whiter teeth in days." },
          { title: "Natural Formula:", desc: "Activated charcoal with mint for gentle whitening." },
          { title: "Enamel-Safe:", desc: "A gentle blend designed to protect your teeth." },
        ],
        appGuide: {
          title: "🦷 Application Guide (Powder)",
          steps: [
            { label: "Dip & Coat:", desc: "Gently dip your damp toothbrush into the powder." },
            { label: "Brush:", desc: "Brush gently in circular motions for 2 minutes." },
            { label: "Rinse:", desc: "Rinse thoroughly with water." },
          ],
          proTip: "Use twice daily for best results.",
        },
      },
    ],
  },
  {
    id: "6",
    handle: "dental-pro-white-strips-teeth-whitening-powder-highly-recommended-20-extra-discount-copy",
    badge: "Sale",
    image: "/promo40.png",
    title: "40% OFF on Whitening Strips – 🔥 LIMITED TIME DEAL🔥",
    subtitle: "PAKISTAN'S NO 1",
    originalPrice: 1200,
    salePrice: 720,
    bundleHeading: "🔥 LIMITED TIME DEAL: 40% OFF! 🔥",
    bundleDesc: "Mad Dental **Professional Teeth Whitening Strips** – Enamel Safe, Mint Fresh, 7 applications.",
    sections: [
      {
        title: "Pro Strips",
        intro:
          "Achieve a brighter smile in just 30 minutes a day with our **HP6% whitening strips**. Enamel-safe and dentist-approved for use at home.",
        whyLoveIt: [
          { title: "Rapid Results:", desc: "Expert-level whitening in a swift, 30-minute session." },
          { title: "Visible Brightness:", desc: "Noticeably whiter teeth after just 7 applications." },
          { title: "Stain Eraser:", desc: "Combats stubborn stains from coffee, tea, and tobacco." },
          { title: "Enamel-Safe:", desc: "A gentle, cosmetic blend designed to protect your teeth." },
        ],
        appGuide: {
          title: "🦷 Application Guide (Strips)",
          steps: [
            { label: "Prep:", desc: "Ensure your teeth are thoroughly brushed and completely dry." },
            { label: "Apply Top:", desc: "Peel the backing from the longer strip and place across upper teeth." },
            { label: "Apply Bottom:", desc: "Repeat with the shorter strip on your lower teeth." },
            { label: "Wait:", desc: "Let the strips sit undisturbed for exactly 30 minutes." },
            { label: "Remove:", desc: "Peel off and safely discard the strips." },
          ],
          proTip: "For maximum brightness, use once daily for 7 consecutive days.",
        },
      },
    ],
  },
];
