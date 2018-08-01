import classnames from 'classnames';
import { components, data, editor, element, i18n } from 'wp';
import CodeEditor from './code-editor';
import { languageChoices, themeChoices } from './settings';

const { PanelBody, SelectControl, ToggleControl } = components;
const { dispatch, select, withSelect } = data;
const { InspectorControls } = editor;
const { Component, Fragment } = element;
const { __ } = i18n;

export class CodeBlockEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onChangeTheme = this.onChangeTheme.bind( this );
	}

	onChangeTheme( value ) {
		dispatch( 'cedaro/code' ).updateTheme( value )
	}

	render() {
		const { attributes, className, setAttributes, theme } = this.props;
		const { content, language, showLineNumbers } = attributes;

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
					<PanelBody title={ __( 'Settings' ) } initialOpen={ false }>
						<p>
							{ __( 'Settings that apply to all Shiny Code blocks.' ) }
						</p>
						<SelectControl
							label={ __( 'Theme' ) }
							value={ theme }
							options={ themeChoices }
							onChange={ this.onChangeTheme }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<CodeEditor
						content={ content }
						language={ language }
						showLineNumbers={ showLineNumbers }
						theme={ this.props.theme }
						onChange={ value => setAttributes( { content: value } ) }
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
