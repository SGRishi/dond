# Deal or No Deal

A simple web implementation of the Deal or No Deal game. The page can be
served statically so you do not need Python or Flask to play.

## Playing locally

Simply open `index.html` in your web browser. The `static/` folder contains
the JavaScript and CSS files used by the page. A theme toggle in the top
right lets you switch between dark and light modes.

## Hosting on GitHub Pages

Commit this repository to GitHub and enable Pages from the repository
settings. Because everything is static you only need the `index.html` file
and the `static/` directory. Once enabled the game is playable at
`https://<user>.github.io/<repo>/`.

If you prefer to run a local server you can still use the small Flask app
provided:

```bash
python app.py
```

Then open `http://localhost:5000` in your browser.
