export const ICON_SOURCES: Record<string, ReturnType<typeof require>> = {
  dot: require("@/assets/plan-dot-512.svg"),
  mochi: require("@/assets/plan-mochi-512.svg"),
  scout: require("@/assets/plan-scout-512.svg"),
  barley: require("@/assets/plan-barley-512.svg"),
  blue: require("@/assets/plan-blue-512.svg"),
  bo: require("@/assets/plan-bo-512.svg"),
  bramble: require("@/assets/plan-bramble-512.svg"),
  ember: require("@/assets/plan-ember-512.svg"),
  fern: require("@/assets/plan-fern-512.svg"),
  fig: require("@/assets/plan-fig-512.svg"),
  gum: require("@/assets/plan-gum-512.svg"),
  juniper: require("@/assets/plan-juniper-512.svg"),
  lily: require("@/assets/plan-lily-512.svg"),
  momo: require("@/assets/plan-momo-512.svg"),
  mush: require("@/assets/plan-mush-512.svg"),
  nib: require("@/assets/plan-nib-512.svg"),
  nox: require("@/assets/plan-nox-512.svg"),
  pip: require("@/assets/plan-pip-512.svg"),
  puff: require("@/assets/plan-puff-512.svg"),
  shelly: require("@/assets/plan-shelly-512.svg"),
  sol: require("@/assets/plan-sol-512.svg"),
  tuck: require("@/assets/plan-tuck-512.svg"),
  wren: require("@/assets/plan-wren-512.svg"),
};

const ICON_IDS = [
  "dot",
  "mochi",
  "scout",
  "barley",
  "blue",
  "bo",
  "bramble",
  "ember",
  "fern",
  "fig",
  "gum",
  "juniper",
  "lily",
  "momo",
  "mush",
  "nib",
  "nox",
  "pip",
  "puff",
  "shelly",
  "sol",
  "tuck",
  "wren",
] as const;

export const ICONS = ICON_IDS.map((id) => ({
  id,
  source: ICON_SOURCES[id],
  label: id[0].toUpperCase() + id.slice(1),
}));

export const ICON_TYPES: Record<(typeof ICON_IDS)[number], "animal" | "plant"> =
  {
    dot: "plant",
    mochi: "animal",
    scout: "animal",
    barley: "animal",
    blue: "plant",
    bo: "animal",
    bramble: "animal",
    ember: "animal",
    fern: "animal",
    fig: "plant",
    gum: "animal",
    juniper: "animal",
    lily: "animal",
    momo: "animal",
    mush: "plant",
    nib: "plant",
    nox: "animal",
    pip: "animal",
    puff: "animal",
    shelly: "animal",
    sol: "plant",
    tuck: "animal",
    wren: "animal",
  };

export function getIconDetails(id: (typeof ICON_IDS)[number]) {
  const details: Record<(typeof ICON_IDS)[number], string> = {
    dot: "Happy cactus — barrel body with arms and spines, pink flower crown, cute face with blush on the cactus itself, terracotta pot.",
    mochi:
      "British Longhair — white fluffy fur, teal bow-tie scarf with a gold star pin, amber + blue heterochromia, pink flowers.",
    scout:
      "House sparrow — front-facing, chestnut crown, buff belly with streaks, conical beak, teal satchel with gold star badge.",
    barley:
      "Bear — round patch ears with blush inners, broad tan head, cream muzzle with an oval nose and w-mouth, teal scarf across the chin and a gold bead below it.",
    blue: "Bonsai — three canopy pads in teal and sage speckled with blossom dots, a curving brown trunk and branch, and a shallow clay trough with a rim bar and a face.",
    bo: "Bee — translucent mint wings swept back, amber body banded with charcoal stripes, antennae tipped with dots, blush cheeks, small smile and a pointed tail tip.",
    bramble:
      "Hedgehog — bark-toned quill dome with spikes fanning off the top, pale crescent face tucked underneath, small eyes and nose, and a rose berry pinned to the quills at the right.",
    ember:
      "Ladybird — domed red shell split down the centre with four charcoal spots, dark head band carrying white eyes and a smile, and two antennae tipped with dots.",
    fern: "Fox — sharp triangular ears with blush inners, warm amber head, wide cream muzzle, dark triangle nose over a w-shaped mouth, curled tail at the left and a teal scarf under the chin.",
    fig: "Monstera — one big teal leaf notched with fenestration cuts, two sage leaves sweeping out at the sides, and a terracotta pot with a rim bar and a small face.",
    gum: "Koala — two large fluffy ears with pale inners, wide grey head, big dark spoon nose, blush cheeks, teal scarf below and a sage eucalyptus leaf at the upper right.",
    juniper:
      "Deer — slim brown antlers, ears set out to the sides, tan head with cream dapple dots, cream muzzle with an oval nose, and a teal scarf across the chin.",
    lily: "Frog — two domed eyes riding high above the head, wide green body, pale mint belly, broad curved grin, blush cheeks, splayed feet and a rose petal on the crown.",
    momo: "Panda — round charcoal ears, ivory head, tilted patch eyes, oval nose over a w-mouth, blush cheeks, and a sage bamboo leaf angled in from the lower left.",
    mush: "Toadstool — wide rose cap dotted with cream speckles, thick cream stem holding the face, blush cheeks and a sage grass line at the base.",
    nib: "Sprout — round cream seed body carrying the whole face, two leaves rising from a short stem in sage and deep sage, a sand ground line and gold sparkle dots.",
    nox: "Owl — tall rounded body, two short brow tufts, oversized white eye discs, gold triangular beak, pale cream breast, folded wing curves and gold feet peeking out at the base.",
    pip: "Bunny — two tall upright ears with pink inners, the right one tipped slightly outward, round ivory head, small blush nose, cotton-puff tail at the right and a sage grass line below.",
    puff: "Penguin — dark rounded body with a cream front panel, amber triangular beak and two amber feet, short flippers at the sides, and a teal band across the crown.",
    shelly:
      "Turtle — seen side-on, sage dome shell with segment ridges, head reaching out to the right with tiny eyes and a blush spot, two stubby legs and a rose petal above the shell.",
    sol: "Sunflower — ten amber petals ringing a brown seed face with cream eyes and smile, rose cheeks, a stem carrying two sage leaves and a sand ground line below.",
    tuck: "Mouse — two oversized round ears with blush inners, soft grey head, blush nose with whisker lines fanning out, tail curling off the right, and a gold seed held at the chin.",
    wren: "Whale — mint spout and droplet above the head, rounded blue body, notched tail fluke to the right, cream belly panel, small smile and a teal wave line at the left.",
  };

  return details[id];
}
