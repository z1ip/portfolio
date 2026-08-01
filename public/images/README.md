# Where to put your images

Drop files here and they show up automatically — the site checks whether each
file exists and swaps the placeholder for the real image (no code changes).

## Headshot (About page)

Save your portrait as ONE of these (jpg preferred), roughly 1000×1250 (4:5):

    public/images/headshot.jpg      ← recommended
    public/images/headshot.png
    public/images/headshot.webp

## Résumé (About page download button)

    public/michael-blakely-resume.pdf

## Case study images

One folder per case study, named after its slug. For example, the order-platform
study (`content/case-studies/multi-channel-order-platform.mdx`):

    public/images/case-studies/multi-channel-order-platform/queue.png
    public/images/case-studies/multi-channel-order-platform/before.png
    public/images/case-studies/multi-channel-order-platform/after.png

Then reference them in the .mdx file, e.g.:

    <Figure src="/images/case-studies/multi-channel-order-platform/queue.png"
            caption="The unified order queue." />

    <BeforeAfter
      before={{ src: "/images/case-studies/multi-channel-order-platform/before.png", alt: "Four dashboards" }}
      after={{  src: "/images/case-studies/multi-channel-order-platform/after.png",  alt: "One queue" }}
    />

Any `<Figure>` or `<BeforeAfter>` without a `src` keeps showing a labeled
placeholder frame, so nothing ever looks broken.

## Formats & size

- Photos → `.jpg` or `.webp`. Screenshots/diagrams → `.png`.
- Keep files reasonable (< ~500 KB each where you can) for the Lighthouse score.
- Next.js optimizes and resizes them automatically at request time.
