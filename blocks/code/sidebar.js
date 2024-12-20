import { components, data, editor, element, i18n, plugins } from 'wp';
import { themeChoices } from './settings';

const { PanelBody, SelectControl } = components;
const { PanelColorSettings, PluginSidebar, PluginSidebarMoreMenuItem } = editor;
const { Component, Fragment } = element;
const { dispatch, select, withSelect } = data;
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
				name: __( 'Light Yellow', 'shiny-code' ),
				color: '#fffbdd',
			}
		];

		return (
			<Fragment>
				<PluginSidebarMoreMenuItem target="shiny-code">
					{ __( 'Shiny Code', 'shiny-code' ) }
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name="shiny-code"
					title={ __( 'Shiny Code', 'shiny-code' ) }
				>
					<PanelBody>
						<SelectControl
							label={ __( 'Theme', 'shiny-code' ) }
							value={ theme }
							options={ themeChoices }
							onChange={ value => dispatch( 'cedaro/code' ).updateTheme( value ) }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings', 'shiny-code' ) }
						colorSettings={ [
							{
								value: highlightColor,
								onChange: ( value ) => dispatch( 'cedaro/code' ).updateHighlightColor( value ),
								label: __( 'Highlight Color', 'shiny-code' ),
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
