/**
 * Registers the report on chatmessage
 */
Hooks.once('init', () => {
    console.log("Inline Secrets - Loaded");

   // Replace functions for tinyMCE
   TextEditor.enrichHTML = function (content, {secrets=false, documents=true, links=true, rolls=true, inlineSecrets = true, rollData, ...options}={}) {

    // Create the HTML element
    const html = document.createElement("div");
    html.innerHTML = String(content || "");

    // Remove secret blocks
    if ( !secrets ) {
      let elements = html.querySelectorAll("section.secret");
      elements.forEach(e => e.parentNode.removeChild(e));
    }

    // Plan text content replacements
    let updateTextArray = true;
    let text = [];

    // Replace document links
    if ( options.entities ) {
      console.warn("The 'entities' option for TextEditor.enrichHTML is deprecated. Please use 'documents' instead.");
      documents = options.entities;
    }

    if ( documents ) {
      if ( updateTextArray ) text = this._getTextNodes(html);
      const documentTypes = CONST.DOCUMENT_LINK_TYPES.concat("Compendium");
      const rgx = new RegExp(`@(${documentTypes.join("|")})\\[([^\\]]+)\\](?:{([^}]+)})?`, 'g');
      updateTextArray = this._replaceTextContent(text, rgx, this._createContentLink);
    }

    // Replace hyperlinks
    if ( links ) {
      if ( updateTextArray ) text = this._getTextNodes(html);
      const rgx = /(https?:\/\/)(www\.)?([^\s<]+)/gi;
      updateTextArray = this._replaceTextContent(text, rgx, this._createHyperlink);
    }

    // Replace inline rolls
    if ( rolls ) {
      rollData = rollData instanceof Function ? rollData() : (rollData || {});
      if (updateTextArray) text = this._getTextNodes(html);
      const rgx = /\[\[(\/[a-zA-Z]+\s)?(.*?)([\]]{2,3})(?:{([^}]+)})?/gi;
      updateTextArray = this._replaceTextContent(text, rgx, (...args) => this._createInlineRoll(...args, rollData));
    }

    if (inlineSecrets) {
      if (updateTextArray) text = this._getTextNodes(html);
      const rgx = new RegExp(
          `@(secret|Secret)\\[([^\\]]+)\\](?:{([^}]+)})?`,
          "g"
      );
      updateTextArray = this._replaceTextContent(
          text,
          rgx,
          this._createSecret
      );
  }

    // Return the enriched HTML
    return html.innerHTML;
  };

  TextEditor._createSecret = function (match) {
    //Get a random value
      const a = document.createElement("span");
      a.setAttribute('class', 'spoiler-text');
      a.setAttribute('tabindex', '0');
      match = match.substring(8, match.length - 1);
      a.innerHTML = match;
      if (game.user.isGM == false ) a.innerHTML = '';
      return a;
  };


});

