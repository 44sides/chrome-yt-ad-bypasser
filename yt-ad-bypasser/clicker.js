const flags = {
  add: false,
  block: false,
  choice: false,
  success: false
};

function clear_flags() {
	Object.keys(flags).forEach(key => flags[key] = false);
}

// main page section
if (location.pathname.startsWith("/watch")) {
	
	const observer = new MutationObserver(mutations => {	
	
		if (!flags.add) {
			const addBtn = document.querySelector('button.ytp-ad-clickable[aria-label="My Ad Center"]');
			if (addBtn) {
				flags.add = true;
				if (!document.querySelector('button.ytp-ad-skip-button-modern')) {
					addBtn.click();
				}
			}
		}
		
		mutations.forEach(mutation => {
			mutation.removedNodes.forEach(node => {
				if (node.nodeType === 1 && node.matches('button.ytp-ad-clickable[aria-label="My Ad Center"]')) {
					clear_flags();
				}
			});
		});
		
	});

	observer.observe(document, { childList: true, subtree: true });
	
// iframe section
} else if (location.pathname.startsWith("/aboutthisad") && top.document.querySelector('button.ytp-ad-clickable[aria-label="My Ad Center"]')) {

	const observer = new MutationObserver(mutations => {	
		
		if (!flags.block) {
			const blockBtn = document.querySelector('button[aria-label="Block"]');
			if (blockBtn) {
				flags.block = true;
				blockBtn.click();
			}
		}
		
		if (!flags.choice) {
			const choiceBtns = document.querySelectorAll("div[role='button']");
			if (choiceBtns) {
				choiceBtns.forEach(btn => {
					if (btn.textContent.trim() === "CONTINUE") {
						flags.choice = true;
						btn.click();
					}
				});
			}
		}
		
		if (!flags.success) {
			const successTexts = document.querySelectorAll("div[aria-live='polite']");
			if (successTexts) {
				successTexts.forEach(btn => {
					if (btn.textContent.trim() === "Ad blocked. You shouldn't see this ad again from Google.") {
						flags.success = true;
						const closeBtn = document.querySelector('button[aria-label="Close"]');
						closeBtn.click();
					}
				});
			}
		}
		
	});

	observer.observe(document, { childList: true, subtree: true });
	
}