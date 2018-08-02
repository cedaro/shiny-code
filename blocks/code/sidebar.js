import { components, data, editPost, element, i18n, plugins } from 'wp';
import { themeChoices } from './settings';

const { ColorPalette, PanelBody, PanelColor, SelectControl } = components;
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
					<PanelColor title={ __( 'Highlight Color' ) } colorValue={ highlightColor } >
						<ColorPalette
							colors={ highlightColors }
							value={ highlightColor }
							onChange={ value => dispatch( 'cedaro/code' ).updateHighlightColor( value ) }
						/>
					</PanelColor>
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

registerPlugin( 'plugin-name', {
	icon: 'editor-code',
	render: withSelect( function( select ) {
		return {
			highlightColor: select( 'cedaro/code' ).getHighlightColor(),
			theme: select( 'cedaro/code' ).getTheme()
		};
	} )( Sidebar ),
} );
