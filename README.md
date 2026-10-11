# Leelaprasath V – Portfolio

Static site (HTML/CSS/JS). Content lives in `data/*.json`; images are matched by id from `assets/images/<projects|certificates|internships>/<id>.png|jpg|jpeg|webp|svg`.

## Deploy
1. Replace the contents of your `portfolio-website` repo with these files and push to `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` publishes to https://leelaprasath008.github.io/portfolio-site/ on every push.

Test locally: `python -m http.server` then open http://localhost:8000 (JSON loading needs a server, not file://).
