
This guide helps you to create beautiful and SEO-friendly web pages in a breeze by combining the power of Builder.io's visual editor with Next.js and Tailwind CSS. Let's dive in!

__Prerequisites:__

- __Node.js 18.17 or Later__: Download and install Node.js from the official website (https://nodejs.org/en).

- __Basic Terminal Comfort__: Familiarity with navigating your project directory in the terminal will be helpful (optional for basic coding).

# Setting Up Your Next.js Project:

Working with Next.js app is very simple. All you have to do is to enter this one command in your terminal. 

### __Step 1__: Open Terminal and run the following

```bash
  npx create-next-app@latest
```
Note: npm is the command used to install all the packages required. It is not abbrevated as Node Package Manager. It is just npm. 

### __Step 2__: Follow the prompts in the terminal:

```bash
- Choose Yes for TypeScript (recommended).
- Choose Yes for ESLint (optional).
- Choose Yes for Tailwind CSS (pre-configured). YES! YES!
- Accept other defaults.
```

If you feel fancy, you can find more about the project structure and in detail explanation in the [Next.js documentation](https://nextjs.org/docs/getting-started/project-structure).


Nextjs comes with Tailwindcss as you see from the above prompts. That means you dont have to worry about configuring various thing to make use of Tailwind. But if you wish to read more about adding manually, find it in [Tailwind Official Quickstart guide](https://tailwindcss.com/docs/installation)

### __Step 3__: Hero of the Hour - Integrating Builder.io for Content Management:

- Sign Up for Builder.io: Head over to https://www.builder.io/ and create a free account, it is very easy.

### __Step 4__: Grab Your Public API Key

__Option 1:__ 

- Within your Builder Space, press __Cmd/Ctrl + k__ to open the Command Palette.

- Type API into the search field and select your API key to copy it.(Yes! it copies automagically)

__Option 2:__

- Within your Builder Space, go to the Account Settings section.

- Click the copy icon next to the Public API Key field.

You can also [click this link](https://www.builder.io/c/docs/using-your-api-key) for the video demonstration on how to find your API key in your Builder account.


# Install Builder.io SDK:

### Manual integration of Builder.io with your Next.js app


- Open the terminal.

- Make sure you are on the root (if you see your project name before __%__ then you are on root of the project )

- Following command will install Builder SDK for you to play with all the cool features of Builder.io

__macOS:__
```bash
 npm install @builder.io/react 

```

__Windows:__
```bash
 npm install "@builder.io/react"
```

__Start the development server:__

```bash
  npm run dev
```

### Automated Integrations using DevTools (Recommended)

We will look at how easy it is to integrate our existing codebase with Builder.io Automated Integrations using __[DevTools](https://www.builder.io/blog/builder-dev-tools)__. It will enable you to create content with ease and in few clicks.

- Open the terminal again. Trust me, this will be the last time i will be asking you to open terminal. May be?

```bash
npm init builder.io@latest

```

When prompted, respond __Yes__ to integrating with Builder.io. It will install all the required items for you. Now you can simply start working on the content in few minutes within your Dashboard. But before that, let us configure some code in your Next.js application. 


# Add a Builder Component to your app

- Create a folder named __components__ and then create a file named __builder.tsx__ inside it. (Everything inside App Directory. Remember, this is for Next.js App Router configuration)

- Paste the following code into builder.tsx:

```javascript
"use client";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react"; 
import { BuilderContent, builder } from '@builder.io/sdk';
import DefaultErrorPage from "next/error";

interface BuilderPageProps { 
  content?: BuilderContent;
}

// Replace with your Public API Key
builder.init(YOUR_API_KEY);

export function RenderBuilderContent({ content }: BuilderPageProps) { 
  // Call the useIsPreviewing hook to determine if 
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing(); 
  // If `content` has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model="page" />;
  }
  // If the `content` is falsy and the page is 
  // not being previewed in Builder, render the 
  // DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />; 
}

```


# Create Page Component: 

- Create a folder named [...page] inside the app directory.

- Inside [...page], create a file named page.tsx and paste the following code:


```javascript

// Example file structure, app/[...page]/page.tsx
// You could alternatively use src/app/[...page]/page.tsx
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Replace with your Public API Key
builder.init(YOUR_API_KEY);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} />
    </>
  );
}

```

# Using Builder's Visual editor to create and edit pages

- If you are a new user, Builder.io will guide you with the onboarding *visually* and you will be able to see how easy it is to follow the instructions until you publish your App.


- If you are an existing user, then you need to go to the __Models__ section in Builder Dashboard and click on __Page__ model.

- Set the __Preview URL__ to http://localhost:YOUR_PORT where YOUR_PORT is the port number for your app. Be sure to include the __http://__ (for ex: http://localhost:5000)

- Click __Save__.

- In the __Content__ section of Builder from the navbar on the left, Click on __New Entry__ and select __Page__.

- In the create page popup, enter __Name__ and set __URL__ for the page and press __Create Page__.

- It will redirect you to the visual editor. Now you can drag some Text Blocks on the screen, with some copy such as "Hello World!".

- Click the __Publish__ button.

- Visit http://localhost:5000/test-page, where test-page is the name you gave your page, to see your creation "Hello World!" displayed on your local machine. 

- __Congratulations!__ You've successfully integrated Builder.io with your Next.js app using Tailwind CSS. Now you can leverage Builder's visual editor to create and manage content effortlessly. Make sure you play with the editor to get yourself comfortable with the platform.


If you want to see the entire process of getting your API key and then using Models Section to mapping to your Preview URL, then [click here](https://www.builder.io/c/docs/quickstart#step-3-using-your-app-in-builders-visual-editor).


# Additional Resources:

- Builder.io Documentation: https://www.builder.io/c/docs/intro
- Next.js Getting Started: https://nextjs.org/docs/getting-started/installation
- Tailwind CSS Documentation: https://tailwindcss.com/docs/installation
