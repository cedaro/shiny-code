import { components, data, editPost, element, i18n, plugins } from 'wp';
import { themeChoices } from './settings';

const { PanelBody, SelectControl } = components;
const { Component, Fragment } = element;
const { dispatch, select, withSelect } = data;
const { PluginSidebar, PluginSidebarMoreMenuItem } = editPost;
const { __ } = i18n;
const { registerPlugin } = plugins;

class Sidebar extends Component {
	constructor() {
		super( ...arguments );

		this.onChangeTheme = this.onChangeTheme.bind( this );
	}

	onChangeTheme( value ) {
		dispatch( 'cedaro/code' ).updateTheme( value )
	}

	render() {
		const { theme } = this.props;

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
				</PluginSidebar>
			</Fragment>
		);
	}
}

registerPlugin( 'plugin-name', {
	icon: 'editor-code',
	render: withSelect( function( select ) {
		return {
			theme: select( 'cedaro/code' ).getTheme()
		};
	} )( Sidebar ),
} );
