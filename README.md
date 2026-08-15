# SOS project page

## Publish with GitHub Pages

In the repository's GitHub settings, open **Pages**, choose **Deploy from a
branch**, and select the `main` branch with the `/docs` directory. GitHub will
publish `docs/index.html` as the project homepage.

To preview it locally from the repository root:

```bash
python -m http.server 8000 --directory docs
```

Then open `http://localhost:8000`.

Media replacement instructions are in [`assets/README.md`](assets/README.md).
