// ========================================
// SOCIAL SHARE FUNCTIONALITY
// ========================================

class SocialShare {
    constructor() {
        this.pageUrl = 'https://pssa-code.github.io/cs2-psa-calculator-ultra/';
        this.pageTitle = 'CS2 PSA Calculator Ultra - Encuentra tu sensibilidad perfecta';
        this.pageDescription = '🎯 Calculadora PSA profesional con algoritmo adaptativo. Encuentra tu sensibilidad perfecta en CS2 en solo 7 iteraciones. ¡100% GRATIS!';
        
        this.init();
    }
    
    init() {
        this.createShareButtons();
        this.attachEventListeners();
    }
    
    createShareButtons() {
        const container = document.createElement('div');
        container.className = 'social-share-container';
        container.innerHTML = `
            <button class="share-main-btn" id="shareMainBtn" title="Compartir">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                <span class="share-tooltip">Compartir</span>
            </button>
            
            <button class="share-btn share-btn-twitter" id="shareTwitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
                <span class="share-tooltip">Compartir en Twitter</span>
            </button>
            
            <button class="share-btn share-btn-reddit" id="shareReddit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                <span class="share-tooltip">Compartir en Reddit</span>
            </button>
            
            <button class="share-btn share-btn-whatsapp" id="shareWhatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span class="share-tooltip">Compartir en WhatsApp</span>
            </button>
            
            <button class="share-btn share-btn-telegram" id="shareTelegram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span class="share-tooltip">Compartir en Telegram</span>
            </button>
            
            <button class="share-btn share-btn-copy" id="shareCopy">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                <span class="share-tooltip">Copiar enlace</span>
            </button>
        `;
        
        document.body.appendChild(container);
    }
    
    attachEventListeners() {
        const shareTwitter = document.getElementById('shareTwitter');
        const shareReddit = document.getElementById('shareReddit');
        const shareWhatsapp = document.getElementById('shareWhatsapp');
        const shareTelegram = document.getElementById('shareTelegram');
        const shareCopy = document.getElementById('shareCopy');
        const shareMainBtn = document.getElementById('shareMainBtn');
        
        if (shareTwitter) shareTwitter.addEventListener('click', () => this.shareOnTwitter());
        if (shareReddit) shareReddit.addEventListener('click', () => this.shareOnReddit());
        if (shareWhatsapp) shareWhatsapp.addEventListener('click', () => this.shareOnWhatsapp());
        if (shareTelegram) shareTelegram.addEventListener('click', () => this.shareOnTelegram());
        if (shareCopy) shareCopy.addEventListener('click', () => this.copyLink());
        if (shareMainBtn) shareMainBtn.addEventListener('click', () => this.openNativeShare());
    }
    
    shareOnTwitter() {
        const text = `${this.pageDescription} #CS2 #CounterStrike #Gaming`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.pageUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    }
    
    shareOnReddit() {
        const url = `https://www.reddit.com/submit?url=${encodeURIComponent(this.pageUrl)}&title=${encodeURIComponent(this.pageTitle)}`;
        window.open(url, '_blank', 'width=800,height=600');
    }
    
    shareOnWhatsapp() {
        const text = `${this.pageTitle}\n\n${this.pageDescription}\n\n${this.pageUrl}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }
    
    shareOnTelegram() {
        const text = `${this.pageTitle}\n\n${this.pageDescription}`;
        const url = `https://t.me/share/url?url=${encodeURIComponent(this.pageUrl)}&text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }
    
    async copyLink() {
        try {
            await navigator.clipboard.writeText(this.pageUrl);
            this.showCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = this.pageUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showCopySuccess();
        }
    }
    
    showCopySuccess() {
        const copyBtn = document.getElementById('shareCopy');
        copyBtn.classList.add('success');
        
        // Show toast notification
        if (typeof showToast === 'function') {
            showToast('✓ ¡Enlace copiado al portapapeles!');
        }
        
        setTimeout(() => {
            copyBtn.classList.remove('success');
        }, 500);
    }
    
    async openNativeShare() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: this.pageTitle,
                    text: this.pageDescription,
                    url: this.pageUrl
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Error sharing:', err);
                }
            }
        } else {
            // If native share not available, copy link
            this.copyLink();
        }
    }
}

// Initialize social share when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new SocialShare();
    });
} else {
    new SocialShare();
}
