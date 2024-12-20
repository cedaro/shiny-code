import classnames from 'classnames';
import { blocks } from 'wp';
import CodeBlockEdit from './edit';
import './data';
import './sidebar';

const { createBlock, registerBlockType } = blocks;

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
		const { content, firstLineNumber, highlightLines, language, showLineNumbers } = attributes;

		const preClassName = classnames( className, {
			'line-numbers': showLineNumbers
		} );

		const preAttributes = {
			'className': preClassName,
		};

		if ( firstLineNumber !== 1 ) {
			preAttributes['data-start'] = firstLineNumber;
		}

		if ( highlightLines.length > 0 ) {
			// Lines start at 1 instead of 0 in Prism.js.
			preAttributes['data-line'] = highlightLines.map( line => line + 1 ).join( ',' );
		}

		const codeClassName = classnames( {
			[ `language-${ language }` ]: language
		} );

		return <pre {...preAttributes}><code className={ codeClassName }>{ content }</code></pre>;
	}
} );
