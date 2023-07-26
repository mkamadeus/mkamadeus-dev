---
blog: true
title: "Vite & Vue 3: My Experience"
description: My thoughts when using Vite and Vue 3 by using it occasionaly.
author: mkamadeus
date: 2023-02-12
duration: 6
---

> Disclaimer: purely MY opinion and preference based on my experience using both of them.

::TableOfContents
::

## Background

I came to programming and software engineering when first introduced to HTML and CSS in middle school.
It is nothing much, but it was great start for a middle schooler like me.
That's why front end development holds a special place in my heart even though I'm not really doing it that often ❤️

When I entered my days of an undergraduate, I got introduced to Javascript frameworks. There were *LOTS* of them back then, but what caught my attention was Vue and React.
Back then, we used Vue 2 and Vuetify to create a medium sized project for an event we're holding in university.
I learned React by myself, and that's how I learned both frameworks.

Choosing between both of them back then was a pretty tight competition, but at the end I chose to use React.
React was winning in most cases especially in maturity of the framework and documentation (since it was backed by a corporation).
Vue 2 was developer friendly back then, but sometimes it feels clunky and the lack of support sometimes can be a hindrance.

With the rise of Vue 3 and Vite, however; it has improved a lot from what it was back then.
Nowadays, when choosing a front end framework/library I'm going to use Vue 3 as it has matured.
I'll discuss from my POV about what has changed and why I choose Vue 3 over React.

## Differences

### State Management

The old debate of how should we manage state in a frontend Javascript framework.
To be fair, both React and Vue has similarity in this aspect alone.
What I don't like about React is centralized store for states can't be really done without resorting to Redux, which I don't really enjoy using.

I feel Redux is not that straightforward to use.
Different people uses different methods of calling the state and modifying the state which not everybody agrees upon what is the best practice and way to use it.
I did try to use Redux Thunk and it got weird and sometimes overkill for a small project which I mostly do.
For smaller projects I tend to use React Context, but it has some issues too that I'll share in the next section.

In Vue however, it's much clearer and agreed on how we should manage a centralized store.
Previously on Vue 2, most people we're using Vuex and as far as I can recall, it doesn't feel as clunky as Redux (though this might be a skill issue 😅).
Nowadays, people probably use Pinia for their projects.
It's really simple and straightforward to use and we can plug it easily into Vue and Vite projects.

### Typescript 

This is another problem where I think React hasn't handled well enough.
React does support the use of Typescript, but I feel the typings created aren't really defined well enough.
User made typings for React are sometimes not agreed upon.

For example, the use of `React.FC` and similar types is sometimes debated against self-inferring component.
It was used pre-React 18, now it's recommended to let Typescript infer the type itself.
Then again, it's recommended in general to let Typescript infer the types for you, so I don't see why this was introduced in the first place.
Some instances of people can't agree on what should how we use props and define the typings that I can find are:

- [Evidence 1](https://www.reddit.com/r/reactjs/comments/wjq51d/is_reactfc_not_recommended_what_are_other/)
- [Evidence 2](https://www.reddit.com/r/reactjs/comments/vx5qpa/is_fc_still_discouraged/)
- [Evidence 3](https://www.reddit.com/r/reactjs/comments/ys70t9/is_is_still_problematic_to_use_reactfc_if_our/)

> Side note: some of this are just the poster's preference; I don't like how React don't document this clearly.

Another example of this is the `React.Context` typings.
It's not that inconsistent like `React.FC`, but the typings provided are not very ...great.
Again, sometimes people have different opinion on using the provided typing by React.
People sometimes create their own type and sometimes have different style just for creating a simple context.

### Plugins

> This part is mostly just why Vite is awesome! I see React and Vue in an equal position.

Vite plugins are on the rise in the past few years.
With support from community, many plugins and frameworks are build upon Vite.
I hardly see a React x Vite project, so I don't really know how people will utilize it; and I believe it will work similarly with how it works with Vue.
The downside of using React however is there are no meta frameworks that run under Vite.
Next.js, one of the most popular frameworks using React uses Webpack 5 under the hood which I understand why they don't choose to change it to Vite.

### Readibility and Maintainability

Again, this varies between developer to developer.
A good codebase, regardless of the frameworks their using can be easy to read and maintain.
Using React for a quite a while I feel like React can do some improvements to improve readibility.
Even though it's fully in Javascript (or JSX), how React separates business logic and UI logic sometimes can become hard to understand.
The main culprit for me here is `useEffect()` which simply is one of the most confusing hooks of React.

Some of React patterns that I dislike including ones outside of `useEffect()`:

> This can be refactored depending on the person and project, but I see this pretty common.

```jsx
const MyComponent = () => {
	if(condition1) {
		return <div>A</div>
	}

	if(condition2) {
		return <div>B</div>
	}

	// different approach if it's nested
	return <div>
		...
		{
			condition3
				? <div>C</div>
				: <div>D</div>
		}
	</div>
}
```

```jsx
const MyComponent = () => {
	useEffect(() => {
		// do A
	}, [depA])

	useEffect(() => {
		// do B, but this is async
	}, [depB])
	
	useEffect(() => {
		// do C, but this is async
	}, [depC, depD])

	...
}
```

Simply put, `useEffect()` will run a callback when something on the dependency list has changed.
Based on the name itself, this hook is for handling side effects when somethings changed.
Many people misused `useEffect()` and instead ran it without the dependency list to update something when anything changed on that component which is not considered a good practice.
`useEffect` is discussed in more [Dan Abramov's blog post](https://overreacted.io/a-complete-guide-to-useeffect/) (cool guy).
Lots of rules and recommendation written, which can be daunting.

My personal view on this is `useEffect()`, using it correctly or incorrectly can lead to horrendous maintainability sometimes.
You sometimes wouldn't realize that something updates, changed, and a hook triggers (or the opposite even, it doesn't).
I understand how people enjoy using React because of its tightly coupled style of writing code between UI logic and business logic.
Personally, I think it makes some code harder to be maintained.

In Vue, I can separate UI logic and business logic better.
Vue has better ways of doing UI logic like conditional rendering and list rendering with things like `v-if` and `v-for`.
In React you do those in Javascript which may not seem like much but I think Vue's approach (and I think other frameworks too like Svelte) to this is way better and clean for readibility.

With the introduction of `<script setup>`, things become much better to read and understand.
We "set up" everything we need there for business logic and helper functions we may need for the UI and simply use it.
I have converted a project of mine from Vue and React, and it's way more readable than it was when using React and hooks.

### Styling

When talking about frontend libraries, it's inevitable on how we should style our websites.
Even though it's the age of Tailwind-like, people tend to use their own organization of styling.
Vue definitely excels at this since it provides as with dedicated `<style>` tags inside the components.

Vue also gives their users the ability to have conditional styling.
A common pattern is to have certain styling active on some condition.
With Vue's directive, we can achieve this with supplying the `class` attribute with a simple JSON map.
This pattern works particularly well with Tailwind-like libraries.

```vue
<div :class="{"class-name-1": isLoading, "class-name-2": !isLoading }">
	stuff here...
</div>
```

React on the other hand doesn't really provide you with a way to give styles easily.
Other than using `.css` files, the other best option you have is CSS in JS.
Personal opinion starts here; I don't really like CSS in JS since it clutters my code.
I'd rather use plain `.css` files instead.

Vue enhances the DX for giving styles.
I don't feel like React put much thought into how we should style something; it's left for us the users to decide.

## What React is Good at

To close of my writing, it seems fair to bring up the positives of using React on this day of age.
I acknowledge that React now has one of the biggest community, if not the biggest community among other Javascript libraries/frameworks.
It might be easier for people getting started to use React because of the vast community supporting it.
For relatively experimetnal and small projects, I can see people using React.

Don't forget that React Native exists; it's a good option for people who want to do mobile development but would like to use React for it's component system.
Even though personally I would go with Flutter now, React Native was the first of its kind to have cross-platform functionality.
Startups in every direction still uses React Native for their ground-breaking app.
This is one aspect that Vue can work on (but I personally think they should stick to websites).

## Conclusion

My personal experience led me to use Vue for the rest of my projects.
Vast plugins and the growing community made me stick to the Vue ecosystem.
I hope that React can grow the way that Vue has with the way it adapts and works with the community and new features that improve the developer experience.
