// Selector de idioma ES/EN sin cambiar de URL. Cada elemento traducible lleva
// data-i18n-en="texto en inglés" en el HTML (ver Layout.astro y las páginas) —
// este script cachea el texto en español ya renderizado por el servidor y
// alterna entre ambos con textContent (o el atributo "content" para <meta>).
//
// Detección: si el visitante ya eligió idioma antes (localStorage), se respeta
// esa elección. Si no, se usa el idioma del navegador (navigator.language).
(function () {
	var STORAGE_KEY = "naru_lang";

	function detectLang() {
		var saved = null;
		try {
			saved = localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			// Safari en modo privado / cookies bloqueadas: seguimos sin memoria de idioma.
		}
		if (saved === "es" || saved === "en") return saved;

		var browserLang = (navigator.language || navigator.userLanguage || "es").toLowerCase();
		return browserLang.indexOf("en") === 0 ? "en" : "es";
	}

	function applyLang(lang) {
		var nodes = document.querySelectorAll("[data-i18n-en]");

		nodes.forEach(function (el) {
			var isMeta = el.tagName === "META";
			var isTitle = el.tagName === "TITLE";

			if (el.dataset.i18nEs === undefined) {
				// Primera vez que se toca este elemento: guardamos el español que
				// ya vino renderizado desde Astro, antes de sobreescribirlo.
				el.dataset.i18nEs = isMeta ? el.getAttribute("content") || "" : el.textContent || "";
			}

			var value = lang === "en" ? el.dataset.i18nEn : el.dataset.i18nEs;

			if (isMeta) {
				el.setAttribute("content", value);
			} else if (isTitle) {
				document.title = value;
			} else {
				el.textContent = value;
			}
		});

		document.documentElement.setAttribute("lang", lang);

		var toggle = document.getElementById("lang-switch");
		if (toggle) {
			var nextLang = lang === "es" ? "en" : "es";
			toggle.textContent = lang === "es" ? "EN" : "ES";
			toggle.setAttribute(
				"aria-label",
				lang === "es" ? "Switch to English" : "Cambiar a Español"
			);
			toggle.dataset.nextLang = nextLang;
		}

		try {
			localStorage.setItem(STORAGE_KEY, lang);
		} catch (e) {
			// idem: si falla el storage, el idioma sigue funcionando, solo no se recuerda.
		}
	}

	function init() {
		applyLang(detectLang());

		var toggle = document.getElementById("lang-switch");
		if (!toggle) return;

		toggle.addEventListener("click", function () {
			var next = toggle.dataset.nextLang === "en" ? "en" : "es";
			applyLang(next);

			if (typeof window.gtag === "function") {
				window.gtag("event", "cambiar_idioma", { idioma: next });
			}
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
