import './editor.scss';

import classnames from 'classnames';
import { blocks, i18n } from 'wp';
import CodeBlockEdit from './edit';
import './data';

const { createBlock, registerBlockType } = blocks;
const { __ } = i18n;

registerBlockType( 'cedaro/code', {
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/code' ],
				transform: ( { content } ) => (
					createBlock( 'cedaro/code', { content: content } )
				),
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/code' ],
				transform: ( { content } ) => (
					createBlock( 'core/code', { content: content } )
				),
			},
		],
	},

	edit: CodeBlockEdit,

	save: function( { attributes, className } ) {
		const { content, language, showLineNumbers } = attributes;

		const preClassName = classnames( className, {
			'line-numbers': showLineNumbers
		} );

		const codeClassName = classnames({
			[ `language-${ language }` ]: language
		} );

		return <pre className={ preClassName }><code className={ codeClassName }>{ content }</code></pre>;
	}
} );
