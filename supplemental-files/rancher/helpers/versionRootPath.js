"use strict";

const { posix: path } = require("path");

// Returns the component version root (e.g. /rancher-ai-gc/latest/) as a path
// relative to the page being rendered, so the version segment visible in the
// address bar is preserved: /latest/ stays /latest/, /v0.7.0/ stays /v0.7.0/.
// The language and start page are dropped; the version root serves its own
// redirect (index.html) to the start page of the default language.
//
// page.url looks like /component/version/lang/module/page.html

module.exports = (page) => {
	if (!page || page.layout === "404" || !page.url) return null;

	const segments = page.url.split("/");
	if (segments.length < 3) return null;

	const root = segments.slice(0, 3).join("/") + "/";
	const relative = path.relative(path.dirname(page.url), root);

	return relative.endsWith("/") ? relative : relative + "/";
};
