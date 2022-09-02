/**
 * Registers the report on chatmessage
 */
import {SecretTextEditor} from "./secret-texteditor.js";

game.secret = SecretTextEditor;

Hooks.once('ready', () => {

  const secretRgx = new RegExp(
    `@(secret|Secret)\\[([^\\]]+)\\](?:{([^}]+)})?`,
    "g"
  );
  CONFIG.TextEditor.enrichers.push({pattern:secretRgx, enricher:SecretTextEditor._createSecret});



});

