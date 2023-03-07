const formatter = ({format, mapper} = {}) => {
  if (!format || !mapper) {
    return (templateData) => (templateData === null || templateData === undefined ? '' : templateData).toString();
  }

  const fields = Object.keys(mapper).reduce((p, c) => (p[mapper[c]] = '',  p), {});

  const fm = Object.keys(mapper).reduce((p, c) => {
    return p.replace(new RegExp(`${c}`, 'g'), `\${${mapper[c]}}`);
  }, format);

  return (templateData) => {
    return new Function(
      `{${Object.keys(fields).join(',')}}`,
      'return `' + fm + '`;'
    )(Object.assign({}, fields, templateData))
  };
};

export default formatter;



/*
  * To format string template with value
  * @constructor
  * @param {string} template - the template that need to be formatted
  * @param {object} data - json object that used to replace param-name in string-template
  *
  * i.e: formatStringTemplate('Hello {userName}, Time is now {currentTime}.', {userName: "David", currentTime: "10:30 pm"});
  *      => Hello David, Time is now 10:30 pm.
  *   or formatStringTemplate('Hello {user.fullName}, Last Login: {user.loginInfo.lastLoginDateTime}.', {user: {fullName: "David James", loginInfo: {lastLoginDateTime: "Tue Mar 7 5:46 PM"}}});
  *      => Hello David James, Last Login: Tue Mar 7 5:46 PM.
  * */
  const formatStringTemplate = (template, data) => {
    const fields = template.match(/\{\w+(\.\w+)*\}/g)?.map(v => v.replace(/[\{\}]/g, ''));
    if(fields && fields.length > 0) {
      const strTemplate = fields.reduce((p, field) => {
        p = p.replaceAll(`\{${field}\}`, `\$\{params?.${field.split('.').join('?.')} || ''\}`);
        return p;
      }, template);
      return new Function(`params`, "return `" + strTemplate + "`;")(data);
    } else {
      return template;
    }
  },
