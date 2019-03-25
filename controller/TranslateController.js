const BaseController = require('controllers/base.js');
const { compile } = require('json-schema-to-typescript');
const { tryToParseJson } = require('../utils');

class TranslateController extends BaseController {
  async translate(ctx) {
    const { schema: schemaStr, rootName = '' } = ctx.request.body;
    const schema = tryToParseJson(schemaStr);
    schema.title = rootName || schema.title || 'RootName';
    const result = await compile(schema, rootName);
    ctx.body = {
      ts: result
    };
  }
}

module.exports = TranslateController;