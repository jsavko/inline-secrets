export class SecretTextEditor extends TextEditor {

    static async enrichHTML(content, options={}) {
        super.enrichHTML(content, options);
    }

    static _createSecret = function (match) {
        //Get a random value
        console.log(match)
          const a = document.createElement("span");
          a.setAttribute('class', 'spoiler-text');
          a.setAttribute('tabindex', '0');
          //match = String(match).substring(8, match.length - 1);
          a.innerHTML = match[2];
          if (game.user.isGM == false ) a.innerHTML = '';
          return a;
      };

}
