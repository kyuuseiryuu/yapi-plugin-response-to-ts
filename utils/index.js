const axios = require("axios");
const toCamelCase = require('to-camel-case');

const tryToParseJson = str => {
  let json;
  try {
    json = JSON.parse(str);
  } catch (e) {
  }
  return json;
};

const translateByApi = async id => {
  const { data: { res_body: schema, path } } = await getApiDetail(id);
  const rootName = pathToTypeName(path);
  return await translate(schema, rootName);
};

const translate = async (schema, rootName = 'Root') => {
  const { data } = await axios.default.post('/api/plugin/response-to-ts/test', { schema: schema, rootName });
  return data;
};

const getApiDetail = async actionId => {
  const { data } = await axios.default.get(`/api/interface/get?id=${actionId}`);
  return data;
};

const pathToTypeName = path => {
  const chars = toCamelCase(path).toString().split('');
  chars[0] = chars[0].toUpperCase();
  console.log(chars.join(''));
  return `${chars.join('')}Response`;
};


module.exports = {
  tryToParseJson,
  translate,
  getApiDetail,
  pathToTypeName,
  translateByApi
};