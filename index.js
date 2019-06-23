const formatter = ({format, mapper} = {}) => {
  if (!format || !mapper) {
    return (templateData) => (templateData === null || templateData === undefined ? '' : templateData).toString();
  }
  const fields = Object.keys(mapper).reduce((p, c) => {
    p[mapper[c]] = '';
    return p;
  }, {});
  const fm = Object.keys(mapper).reduce((p, c) => {
    return p.replace(new RegExp(`${c}`, 'g'), `\${${mapper[c]}}`);
  }, format);
  return (templateData) => {
    return new Function(
      `{${Object.keys(templateData).join(',')}}`,
      'return `' + format + '`'
    )(templateData)
  };
};

export default formatter;
