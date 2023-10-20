describe('Editor Menu Buttons', () => {
  test('placeholder', () => {});
  // test('Bold Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const boldButton = screen.getByTestId('editor-bold-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(boldButton);
  //   await user.keyboard(testString);
  //
  //   expect(textElement.innerHTML).toMatch(/^<strong>/);
  // });
  //
  // test('Italics Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const italicsButton = screen.getByTestId('editor-italic-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(italicsButton);
  //   await user.keyboard(testString);
  //
  //   expect(textElement.innerHTML).toMatch(/^<em>/);
  // });
  //
  // test('Underline Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('editor-underline-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //
  //   expect(textElement.innerHTML).toMatch(/^<u>/);
  // });
  //
  // test('Text Color Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const textColorButton = screen.getByTestId('editor-color-picker');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const testString = 'testing';
  //
  //   //Open Color Board
  //   await user.click(textColorButton);
  //   const colorPickerElement = screen.getByTestId('color-picker');
  //   //Click First Element in Color Board
  //   await user.click(colorPickerElement.children[0]);
  //   await user.keyboard(testString);
  //   //Expect Color Span to have been added to editor.
  //   expect(textEditor.children[0].innerHTML).toMatch(/^<p><span style="color:/);
  // });
  //
  // test('Text Highlight Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const textColorButton = screen.getByTestId('editor-highlight-button');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const testString = 'testing';
  //
  //   //Open Color Board
  //   await user.click(textColorButton);
  //   const colorPickerElement = screen.getByTestId('color-picker');
  //   //Click First Element in Color Board
  //   await user.click(colorPickerElement.children[0]);
  //   await user.keyboard(testString);
  //   //Expect mark element with a background color to have been added to editor.
  //   expect(textEditor.children[0].innerHTML).toMatch(/^<p><mark data-color="(.*)" style="background-color:/);
  // });
  //
  // test('Strike Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('editor-strike-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   expect(textElement.innerHTML).toMatch(/^<s>/);
  // });
  //
  // test('Strike Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('editor-strike-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   expect(textElement.innerHTML).toMatch(/^<s>/);
  // });
  //
  // test('Subscript Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('editor-subscript-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   expect(textElement.innerHTML).toMatch(/^<sub>/);
  // });
  //
  // test('Superscript Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('editor-superscript-button');
  //   const textElement = screen.getByText('init');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   expect(textElement.innerHTML).toMatch(/^<sup>/);
  // });
  //
  // test('Bullet List Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('bullet-list-button');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   //Expect an unordered list to be created, and the first paragraph element to be stored in a list item element.
  //   expect(textEditor.children[0].innerHTML).toMatch(/^<ul class="list-disc"><li class="list-disc"><p>/);
  // });
  //
  // test('Ordered List Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('ordered-list-button');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   //Expect an ordered list to be created, and the first paragraph element to be stored in a list item element.
  //   expect(textEditor.children[0].innerHTML).toMatch(/^<ol><li class="list-disc"><p>/);
  // });
  //
  // test('Block Quote Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('editor-block-quote-button');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   //Expect a Block Quote Element to be created
  //   expect(textEditor.children[0].innerHTML).toMatch(/^<blockquote>/);
  // });
  //
  // test('Code Block Button Click', async () => {
  //   const { user } = render(
  //     <Providers>
  //       <Editor setWindow={(() => {}) as any} />
  //     </Providers>,
  //   );
  //
  //   const button = screen.getByTestId('code-block-quote-button');
  //   const textEditor = screen.getByTestId('text-editor');
  //   const testString = 'testing';
  //   await user.click(button);
  //   await user.keyboard(testString);
  //   //Expect a Code Block Element to be created
  //   expect(textEditor.children[0].innerHTML).toMatch(/^<pre class="codeContainer" spellcheck="false"><code>/);
  // });
});
