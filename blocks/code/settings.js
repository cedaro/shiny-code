const { languages, themes } = _shinyCode;

const defaultLanguageSettings = {
	autoCloseBrackets: false,
	autoCloseTags: false,
	line: false,
	matchBrackets: false,
	matchTags: false
};

const languageSettings = Object.keys( languages ).reduce( ( settings, key ) => {
	settings[ key ] = languages[ key ].codemirror;
	return settings;
}, {} );

export const getLanguageSettings = ( language ) => {
	const settings = Object.assign( {}, defaultLanguageSettings );

	if ( language in languageSettings ) {
		Object.assign( settings, languageSettings[ language ] );
	}

	return settings;
};

export const languageChoices = Object.keys( languages ).reduce( ( choices, key ) => {
	choices.push( {
		value: key,
		label: languages[ key ].name
	} );

	return choices;
}, [ { value: '', label: '' } ] );

export const themeChoices = Object.keys( themes ).map( key => {
	let themeId = key;

	if ( -1 !== key.indexOf( 'solarized' ) ) {
		themeId = key.replace( '-', ' ' );
	}

	return {
		value: themeId,
		label: themes[ key ].name
	};
} );
