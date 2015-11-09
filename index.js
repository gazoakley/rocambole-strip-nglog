'use strict';
var updateNode = require('rocambole-node-update');

module.exports = function (node) {
	if (node.type !== 'CallExpression') {
		return;
	}

	var expression = node.callee;

	if (expression && expression.type !== 'MemberExpression') {
		return;
	}

	var main = expression.object;

	if (main && main.type === 'Identifier' && main.name === '$log' && expression.property) {
		updateNode(node, 'void 0');
	}
};
