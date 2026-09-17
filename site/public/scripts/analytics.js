// Bootstrap de GA4. Lee el Measurement ID del atributo data-ga-id del propio <script>
// (en vez de imprimir el valor inline) para que este archivo cumpla la CSP de
// script-src 'self' sin necesitar 'unsafe-inline' ni hashes por script.
(function () {
	var gaId = document.currentScript && document.currentScript.dataset.gaId;
	if (!gaId) return;

	window.dataLayer = window.dataLayer || [];
	function gtag() {
		window.dataLayer.push(arguments);
	}
	window.gtag = gtag;

	gtag("js", new Date());
	gtag("config", gaId);
})();
