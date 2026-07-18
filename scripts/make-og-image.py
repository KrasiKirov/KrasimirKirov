"""Render the portfolio OG image (1200x630) in the site's expedition aesthetic."""
from PIL import Image, ImageDraw, ImageFont
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

fr_semi   = lambda s: font("Fraunces.ttf", s, "SemiBold")
mono      = lambda s: ImageFont.truetype(os.path.join(F, "SpaceMono-Regular.ttf"), s)
mono_b    = lambda s: ImageFont.truetype(os.path.join(F, "SpaceMono-Bold.ttf"), s)
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

# --- globe: a soft sphere on the right, mirroring the hero poster ---
GX, GY, GR = 940, 315, 232
sphere = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(sphere)
steps = 150
for i in range(steps, 0, -1):
    rr = GR * i / steps
    t = i / steps
    # ocean core -> lighter limb
    base = (39, 87, 116)
    lim  = (116, 192, 236)
    c = tuple(int(base[k] + (lim[k] - base[k]) * (t ** 2.2)) for k in range(3))
    a = int(210 * (1 - t ** 3.2) + 30)
    sd.ellipse([GX - rr, GY - rr, GX + rr, GY + rr], fill=c + (min(a, 235),))
# atmosphere halo
for i in range(28):
    rr = GR + i * 2.6
    a = int(30 * (1 - i / 28))
    sd.ellipse([GX - rr, GY - rr, GX + rr, GY + rr], outline=(116, 192, 236, a), width=3)
# graticule
for k in range(-2, 3):
    ry = GR * math.cos(k * 0.42)
    off = GR * math.sin(k * 0.42)
    sd.ellipse([GX - GR, GY + off - ry * 0.30, GX + GR, GY + off + ry * 0.30],
               outline=(255, 255, 255, 22), width=1)
for k in range(6):
    rx = GR * abs(math.cos(k * math.pi / 6))
    sd.ellipse([GX - rx, GY - GR, GX + rx, GY + GR], outline=(255, 255, 255, 19), width=1)
img = Image.alpha_composite(img.convert("RGBA"), sphere).convert("RGB")
d = ImageDraw.Draw(img, "RGBA")

# left scrim so copy stays crisp over the globe
scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sc = ImageDraw.Draw(scrim)
for x in range(W):
    t = x / W
    if t < 0.42:
        a = 255
    elif t < 0.74:
        a = int(255 * (1 - (t - 0.42) / 0.32))
    else:
        a = 0
    if a:
        sc.line([(x, 0), (x, H)], fill=PAPER + (a,))
img = Image.alpha_composite(img.convert("RGBA"), scrim).convert("RGB")
d = ImageDraw.Draw(img, "RGBA")

PAD = 74

# --- coordinate eyebrow ---
d.text((PAD, 92), "45.50° N · 73.57° W — MONTRÉAL, QC", font=mono(19), fill=MUTED)

# --- name ---
d.text((PAD, 128), "Krasimir Kirov", font=fr_semi(92), fill=INK)

# --- rule ---
d.line([(PAD, 246), (PAD + 300, 246)], fill=INK + (90,), width=2)

# --- role line ---
d.text((PAD, 268), "Backend · Data · Cloud", font=body(38, "SemiBold"), fill=INK)

# --- supporting line ---
d.text((PAD, 322), "Software Engineering @ McGill — five internships", font=body(27), fill=INK2)
d.text((PAD, 356), "across two continents.", font=body(27), fill=INK2)

# --- company row ---
d.text((PAD, 424), "AWS · UKG · INTACT · POMERLEAU", font=mono_b(20), fill=NA)

# --- bottom rule + footer ---
d.line([(PAD, 486), (W - PAD, 486)], fill=INK + (48,), width=1)
d.text((PAD, 512), "krasikirov.github.io/KrasimirKirov", font=mono(21), fill=INK2)

# --- "open to 2027" stamp, rotated like the passport stamps ---
st_w, st_h = 340, 74
stamp = Image.new("RGBA", (st_w, st_h), (0, 0, 0, 0))
sdw = ImageDraw.Draw(stamp)
sdw.rounded_rectangle([2, 2, st_w - 3, st_h - 3], radius=8, outline=EU + (235,), width=3)
f_st = mono_b(23)
txt = "OPEN TO 2027"
tb = sdw.textbbox((0, 0), txt, font=f_st)
sdw.text(((st_w - (tb[2] - tb[0])) / 2, 12), txt, font=f_st, fill=EU + (235,))
f_st2 = mono(15)
txt2 = "NEW-GRAD ROLES"
tb2 = sdw.textbbox((0, 0), txt2, font=f_st2)
sdw.text(((st_w - (tb2[2] - tb2[0])) / 2, 45), txt2, font=f_st2, fill=EU + (215,))
stamp = stamp.rotate(4.5, resample=Image.BICUBIC, expand=True)
img.paste(stamp, (W - PAD - stamp.width - 14, 458), stamp)

# --- corner ticks (field-notes framing) ---
def tick(x, y, dx, dy):
    d.line([(x, y), (x + dx, y)], fill=INK + (120,), width=2)
    d.line([(x, y), (x, y + dy)], fill=INK + (120,), width=2)
M, L = 34, 26
tick(M, M, L, L); tick(W - M, M, -L, L); tick(M, H - M, L, -L); tick(W - M, H - M, -L, -L)

img.save(os.path.join(S, "og-image.png"), "PNG", optimize=True)
print("wrote", os.path.join(S, "og-image.png"), img.size)
