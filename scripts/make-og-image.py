"""Render the portfolio OG image (1200x630) in the site's expedition aesthetic."""
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import math, os

S = os.path.dirname(os.path.abspath(__file__))
F = os.path.join(S, "fonts")

W, H = 1200, 630

# --- site tokens (light theme) ---
PAPER      = (236, 227, 209)
PAPER_TOP  = (240, 232, 216)
PANEL      = (246, 241, 229)
INK        = (31, 42, 50)
INK2       = (69, 83, 94)
MUTED      = (85, 98, 106)
NA         = (26, 107, 145)   # teal/blue
EU         = (201, 85, 47)    # terracotta
SA         = (44, 122, 73)    # fern
GOLD       = (217, 154, 36)
HAIR       = (31, 42, 50, 40)

def font(path, size, instance=None):
    f = ImageFont.truetype(os.path.join(F, path), size)
    if instance:
        f.set_variation_by_name(instance)
    return f

serif_semi = lambda s: ImageFont.truetype(os.path.join(F, "IBMPlexSerif-SemiBold.ttf"), s)
mono      = lambda s: ImageFont.truetype(os.path.join(F, "IBMPlexMono-Regular.ttf"), s)
mono_b    = lambda s: ImageFont.truetype(os.path.join(F, "IBMPlexMono-Bold.ttf"), s)
body      = lambda s, i="Regular": font("HankenGrotesk.ttf", s, i)

img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img, "RGBA")

# --- background: soft vertical paper gradient ---
for y in range(H):
    t = y / H
    c = tuple(int(PAPER_TOP[i] + (PAPER[i] - PAPER_TOP[i]) * t) for i in range(3))
    d.line([(0, y), (W, y)], fill=c)

# --- cartographic grid ---
for x in range(0, W, 46):
    d.line([(x, 0), (x, H)], fill=(31, 42, 50, 12), width=1)
for y in range(0, H, 46):
    d.line([(0, y), (W, y)], fill=(31, 42, 50, 12), width=1)

# --- continental colour washes (echo the body gradient) ---
def wash(cx, cy, r, rgb, alpha):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    steps = 60
    for i in range(steps, 0, -1):
        rr = r * i / steps
        a = int(alpha * (1 - i / steps) ** 1.6)
        ld.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=rgb + (a,))
    img.paste(Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB"), (0, 0))

wash(140, -40, 420, NA, 26)
wash(1180, 40, 380, EU, 22)
wash(980, 660, 460, SA, 22)
d = ImageDraw.Draw(img, "RGBA")

# --- globe: the real Earth, orthographically projected from the site's own
# vendored texture. Centred on the mid-Atlantic so North America and Europe
# are both in view — the "two continents" the copy talks about.
GX, GY, GR = 1058, 306, 254   # bleeds off the right edge, clear of the name
EARTH_TEX = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "assets", "planets", "earth_atmos_2048.jpg",
)
if not os.path.exists(EARTH_TEX):
    EARTH_TEX = "/Users/krasi/Documents/GitHub/KrasimirKirov/assets/planets/earth_atmos_2048.jpg"

def render_earth(size, lat0_deg, lon0_deg, tex_path, ss=3):
    """Orthographic projection of an equirectangular Earth onto a sphere."""
    tex = np.asarray(Image.open(tex_path).convert("RGB")).astype(np.float32)
    th, tw = tex.shape[:2]
    n = size * ss
    yy, xx = np.mgrid[0:n, 0:n]
    c = (n - 1) / 2.0
    nx = (xx - c) / c
    ny = -(yy - c) / c            # screen y is down; flip so +y is north
    r2 = nx ** 2 + ny ** 2
    nz = np.sqrt(np.clip(1.0 - r2, 0, 1))

    lat0, lon0 = math.radians(lat0_deg), math.radians(lon0_deg)
    ca, sa = math.cos(-lat0), math.sin(-lat0)
    x1, y1, z1 = nx, ny * ca - nz * sa, ny * sa + nz * ca      # tilt to latitude
    cb, sb = math.cos(lon0), math.sin(lon0)
    xw, yw, zw = x1 * cb + z1 * sb, y1, -x1 * sb + z1 * cb     # spin to longitude

    lat = np.arcsin(np.clip(yw, -1, 1))
    lon = np.arctan2(xw, zw)
    u = np.clip((((lon + math.pi) / (2 * math.pi)) * (tw - 1)).astype(np.int32), 0, tw - 1)
    v = np.clip((((math.pi / 2 - lat) / math.pi) * (th - 1)).astype(np.int32), 0, th - 1)
    rgb = tex[v, u]

    # key light from the upper left, matching the hero's lighting
    L = np.array([-0.42, 0.34, 0.84]); L /= np.linalg.norm(L)
    ndotl = np.clip(nx * L[0] + ny * L[1] + nz * L[2], 0, 1)
    rgb = rgb * (0.34 + 0.86 * ndotl)[..., None]

    # atmospheric limb
    rim = np.clip((np.sqrt(np.clip(r2, 0, 1)) - 0.82) / 0.18, 0, 1)[..., None]
    rgb = rgb * (1 - rim * 0.5) + np.array([116, 192, 236], np.float32) * (rim * 0.5)

    alpha = np.clip((1.0 - np.sqrt(np.clip(r2, 0, 4))) * (n / 2.0), 0, 1) * 255
    out = np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), alpha.astype(np.uint8)])
    return Image.fromarray(out, "RGBA").resize((size, size), Image.LANCZOS)

glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for i in range(34):
    rr = GR + i * 3.0
    gd.ellipse([GX - rr, GY - rr, GX + rr, GY + rr],
               outline=(116, 192, 236, int(26 * (1 - i / 34))), width=3)
img = Image.alpha_composite(img.convert("RGBA"), glow)

earth = render_earth(GR * 2, 38.0, -42.0, EARTH_TEX)
img.paste(earth, (GX - GR, GY - GR), earth)
img = img.convert("RGB")
d = ImageDraw.Draw(img, "RGBA")

# left scrim so copy stays crisp over the globe
scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sc = ImageDraw.Draw(scrim)
for x in range(W):
    t = x / W
    if t < 0.36:
        a = 255
    elif t < 0.64:
        a = int(255 * (1 - (t - 0.36) / 0.28))
    else:
        a = 0
    if a:
        sc.line([(x, 0), (x, H)], fill=PAPER + (a,))
img = Image.alpha_composite(img.convert("RGBA"), scrim).convert("RGB")
d = ImageDraw.Draw(img, "RGBA")

PAD = 74

# --- coordinate eyebrow ---
d.text((PAD, 92), "45.50° N · 73.57° W · MONTRÉAL, QC", font=mono(19), fill=MUTED)

# --- name ---
d.text((PAD, 128), "Krasimir Kirov", font=serif_semi(92), fill=INK)

# --- rule ---
d.line([(PAD, 246), (PAD + 300, 246)], fill=INK + (90,), width=2)

# --- role line ---
d.text((PAD, 268), "Backend · Data · Cloud", font=body(38, "SemiBold"), fill=INK)

# --- supporting line (tightened to buy room for the company row) ---
d.text((PAD, 318), "Software Engineering @ McGill, five internships", font=body(25), fill=INK2)
d.text((PAD, 349), "across two continents.", font=body(25), fill=INK2)

# --- company row ---
# the row a recruiter scans first in a feed — sized to survive a thumbnail
d.text((PAD, 400), "INTERNSHIPS AT", font=mono(14), fill=MUTED)
d.text((PAD, 424), "AWS · UKG · INTACT · POMERLEAU", font=mono_b(29), fill=NA)

# --- bottom rule + footer (rule stops short of the globe) ---
d.line([(PAD, 474), (786, 474)], fill=INK + (48,), width=1)
URL = "krasimirkirov.com"
f_url = mono(21)
d.text((PAD, 508), URL, font=f_url, fill=INK2)
url_right = PAD + (d.textbbox((0, 0), URL, font=f_url)[2])

# --- "open to 2027" stamp, rotated like the passport stamps ---
st_w, st_h = 250, 62
stamp = Image.new("RGBA", (st_w, st_h), (0, 0, 0, 0))
sdw = ImageDraw.Draw(stamp)
sdw.rounded_rectangle([2, 2, st_w - 3, st_h - 3], radius=7, outline=EU + (235,), width=3)
f_st = mono_b(18)
txt = "OPEN TO 2027"
tb = sdw.textbbox((0, 0), txt, font=f_st)
sdw.text(((st_w - (tb[2] - tb[0])) / 2, 11), txt, font=f_st, fill=EU + (235,))
f_st2 = mono(11)
txt2 = "NEW-GRAD ROLES"
tb2 = sdw.textbbox((0, 0), txt2, font=f_st2)
sdw.text(((st_w - (tb2[2] - tb2[0])) / 2, 38), txt2, font=f_st2, fill=EU + (215,))
stamp = stamp.rotate(4.5, resample=Image.BICUBIC, expand=True)
# sits on the paper beside the URL — clear of both the text and the Earth
stamp_x = max(url_right + 30, 790 - stamp.width)
img.paste(stamp, (int(stamp_x), 496), stamp)

# --- corner ticks (field-notes framing) ---
def tick(x, y, dx, dy):
    d.line([(x, y), (x + dx, y)], fill=INK + (120,), width=2)
    d.line([(x, y), (x, y + dy)], fill=INK + (120,), width=2)
M, L = 34, 26
tick(M, M, L, L); tick(W - M, M, -L, L); tick(M, H - M, L, -L); tick(W - M, H - M, -L, -L)

# write to the repo root, which is where the site actually serves it from
OUT = os.path.join(os.path.dirname(S), "og-image.png")
img.save(OUT, "PNG", optimize=True)
print("wrote", OUT, img.size)
