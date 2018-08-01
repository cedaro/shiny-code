import { element, i18n } from 'wp';
import { getLanguageSettings } from './settings';

const { Component } = element;
const { __, sprintf } = i18n;
const noop = () => {};

export default class CodeEditor extends Component {
	constructor() {
		super( ...arguments );

		this.updateLanguageSettings = this.updateLanguageSettings.bind( this );
	}

	componentDidMount() {
		const { language, showLineNumbers, theme } = this.props;

		const editor = wp.codeEditor.initialize( this.textarea, {
			codemirror: {
				continueComments: true,
				direction: 'ltr',
				gutters: [ 'CodeMirror-lint-markers' ],
				indentUnit: 4,
				indentWithTabs: true,
				inputStyle: 'contenteditable',
				lineNumbers: showLineNumbers,
				lineWrapping: false,
				mode: language || null,
				styleActiveLine: true,
				theme: theme,
				viewportMargin: Infinity,
			}
		} );

		editor.codemirror.on( 'change', () => {
			this.props.onChange( editor.codemirror.getValue() );
		} );

		this.editor = editor;
		this.updateLanguageSettings( language );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevProps.language !== this.props.language ) {
			this.updateLanguageSettings( this.props.language );
		}

		this.editor.codemirror.setOption( 'lineNumbers', this.props.showLineNumbers );
		this.editor.codemirror.setOption( 'theme', this.props.theme );
	}

	componentWillUnmount() {
		this.editor.codemirror.toTextArea();
	}

	updateLanguageSettings( value ) {
		const settings = getLanguageSettings( value );

		this.editor.codemirror.setOption( 'mode', value );

		Object.keys( settings ).forEach( key => {
			this.editor.codemirror.setOption( key, settings[ key ] );
		});
	}

	render() {
		return (
			<textarea
				ref={ el => this.textarea = el }
				placeholder={ __( 'Write code…' ) }
				defaultValue={ this.props.content }
			/>
		);
	}
}
