# Vendored fonts

Build-time only. `make-og-image.py` renders `og-image.png` with these so the social
card uses the same typefaces as the site itself. The site loads its fonts from
Google Fonts at runtime and does not use these files.

| File | Family | Source | License |
|---|---|---|---|
| `IBMPlexSerif-SemiBold.ttf` | IBM Plex Serif | [google/fonts `ofl/ibmplexserif`](https://github.com/google/fonts/tree/main/ofl/ibmplexserif) | OFL 1.1 |
| `IBMPlexMono-Regular.ttf` | IBM Plex Mono | [google/fonts `ofl/ibmplexmono`](https://github.com/google/fonts/tree/main/ofl/ibmplexmono) | OFL 1.1 |
| `IBMPlexMono-Bold.ttf` | IBM Plex Mono | [google/fonts `ofl/ibmplexmono`](https://github.com/google/fonts/tree/main/ofl/ibmplexmono) | OFL 1.1 |
| `HankenGrotesk.ttf` | Hanken Grotesk (variable) | [google/fonts `ofl/hankengrotesk`](https://github.com/google/fonts/tree/main/ofl/hankengrotesk) | OFL 1.1 |

Full license text is in the `OFL-*.txt` files alongside these fonts.

These are vendored (not fetched at build time) so `make-og-image.py` stays runnable
offline and reproducible. If the site's typefaces change, replace these and re-run:

```sh
python3 scripts/make-og-image.py   # writes og-image.png at the repo root
```
