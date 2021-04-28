import express from 'express';
import httpProxy from 'http-proxy';
const proxy = new httpProxy();

proxy.on('error', (err, req, res) => {
  console.error(err);
  res.status(500).send("Couldn't connect");
});

const app = express();
const port = process.env.PORT || 4000;

const proxyToLocalhost = (req, res, next) => {
  try {
    const path = req.originalUrl.split('/').slice(1);
    let url = req.originalUrl;
    if (path[0] == 'mailing') {
      url = path.length >= 1 ? path.join('/') : '';
    }
    req.originalUrl = url;
    //req.headers["host"] = "tamudatathon.com";
    const target = `http://localhost:3000/${url || ''}`;
    const config = {
      target,
      prependPath: true,
      ignorePath: true,
      xfwd: true,
      secure: false,
      cookieDomainRewrite: { 'localhost:3000': `localhost:${port}` }
    };
    proxy.web(req, res, config);
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};

app.all('/mailing', proxyToLocalhost);
app.all('/mailing/*', proxyToLocalhost);

app.all('*', (req, res) => {
  try {
    req.headers['host'] = 'gigabowser.now.sh';
    proxy.web(req, res, {
      target: `https://galaxy.tamudatathon.now.sh`,
      changeOrigin: true,
      cookieDomainRewrite: { 'tamudatathon.com': `localhost:${port}` }
    });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`[Proxy Server] listening on ${port}!`);
});
