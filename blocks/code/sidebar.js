import { components, data, editor, editPost, element, i18n, plugins } from 'wp';
import { themeChoices } from './settings';

const { PanelBody, SelectControl } = components;
const { PanelColorSettings } = editor;
const { Component, Fragment } = element;
const { dispatch, select, withSelect } = data;
const { PluginSidebar, PluginSidebarMoreMenuItem } = editPost;
const { __ } = i18n;
const { registerPlugin } = plugins;

class Sidebar extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { highlightColor, theme } = this.props;

		const highlightColors = [
			{
				slug: 'light-yellow',
				name: __( 'Light Yellow' ),
				color: '#fffbdd',
			}
		];

		return (
			<Fragment>
				<PluginSidebarMoreMenuItem target="shiny-code">
					{ __( 'Shiny Code' ) }
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="shiny-code"
					title={ __( 'Shiny Code' ) }
				>
					<PanelBody>
						<SelectControl
							label={ __( 'Theme' ) }
							value={ theme }
							options={ themeChoices }
							onChange={ value => dispatch( 'cedaro/code' ).updateTheme( value ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						colorSettings={ [
							{
								value: highlightColor,
								onChange: ( value ) => dispatch( 'cedaro/code' ).updateHighlightColor( value ),
								label: __( 'Highlight Color' ),
								colors: highlightColors,
							},
						] }
					/>
					<style>
					{
						`.CodeMirror .CodeMirror-linebackground-highlight {
							background-color: ${highlightColor};
						}`
					}
					</style>
				</PluginSidebar>
			</Fragment>
		);
	}
}

registerPlugin( 'shiny-code', {
	icon: 'editor-code',
	render: withSelect( function( select ) {
		return {
			highlightColor: select( 'cedaro/code' ).getHighlightColor(),
			theme: select( 'cedaro/code' ).getTheme()
		};
	} )( Sidebar ),
} );
