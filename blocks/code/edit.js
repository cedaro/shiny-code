import classnames from 'classnames';
import { components, data, editor, element, i18n } from 'wp';
import CodeEditor from './code-editor';
import { languageChoices } from './settings';

const { PanelBody, SelectControl, ToggleControl } = components;
const { select, withSelect } = data;
const { InspectorControls } = editor;
const { Component, Fragment } = element;
const { __ } = i18n;

export class CodeBlockEdit extends Component {
	constructor() {
		super( ...arguments );

		this.toggleLineHighlight = this.toggleLineHighlight.bind( this );
	}

	toggleLineHighlight( value ) {
		let lines = this.props.attributes.highlightLines;

		if ( lines.includes( value ) ) {
			lines = lines.filter( line => line !== value );
		} else {
			lines = lines.concat( value );
		}

		lines.sort();
		this.props.setAttributes( { highlightLines: lines } );
	}

	render() {
		const { attributes, className, setAttributes, theme } = this.props;
		const { content, highlightLines, language, showLineNumbers } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Language' ) }
							value={ language }
							options={ languageChoices }
							onChange={ value => setAttributes( { language: value } ) }
						/>
						<ToggleControl
							label={ __( 'Display line numbers' ) }
							checked={ showLineNumbers }
							onChange={ () => setAttributes( { showLineNumbers: ! showLineNumbers } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<CodeEditor
						content={ content }
						highlightLines={ highlightLines }
						language={ language }
						showLineNumbers={ showLineNumbers }
						theme={ theme }
						onChange={ value => setAttributes( { content: value } ) }
						onLineNumberClick={ this.toggleLineHighlight }
					/>
				</div>
			</Fragment>
		);
	}
}

export default withSelect( function( select ) {
	return {
		theme: select( 'cedaro/code' ).getTheme()
	};
} )( CodeBlockEdit );
