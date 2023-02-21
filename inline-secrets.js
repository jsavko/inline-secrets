/**
 * Registers the report on chatmessage
 */
import {SecretTextEditor} from "./secret-texteditor.js";

game.secret = SecretTextEditor;

Hooks.once('init', () => {


  const secretRgx = new RegExp(
    `@(secret)\\[(.+)]`,"gmsi");

  CONFIG.TextEditor.enrichers.push({pattern:secretRgx, enricher:SecretTextEditor._createSecret});



});

