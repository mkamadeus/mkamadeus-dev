<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import dayjs from "dayjs";

const { t } = useI18n();
const router = useRouter();

const { data } = await useAsyncData('blogs', () => queryContent('/blogs/en').find())

console.log(data.value)

type BlogPost = {
	id: string,
	title: string,
	description: string,
	path: string,
	date: string,
	duration: number,
	lang: string,
}

const blogs = computed(() => {
	const pages = data.value || []
	const parsedContent: Record<string, ParsedContent[]> = {}
	const posts: Record<string, BlogPost[]> = {}

	// group by year
	pages.forEach((page) => {
		const date = dayjs(page.date)
		const year = date.year().toString();
		if (!parsedContent[year]) parsedContent[year] = [];
		parsedContent[year].push(page);
	});

	// get list of years
	const years = Object.keys(parsedContent).sort((y1, y2) => {
		const diff = parseInt(y1) - parseInt(y2);
		if (diff > 0) return -1;
		if (diff < 0) return 1;
		return 0;
	});

	// for each year listed
	Object.keys(parsedContent).forEach((year) => {
		// sort blogs
		parsedContent[year].sort((b1, b2) => {
			const d1 = dayjs(b1.date)
			const d2 = dayjs(b2.date)
			const diff = d1.diff(d2);
			if (diff > 0) return -1;
			if (diff < 0) return 1;
			return 0;
		});

		// map blogs to simplified format
		posts[year] = parsedContent[year].map((v) => {
			const parsed = v._path!.split('/')
			const id = parsed.pop() || '';
			let lang = parsed.pop() || 'en';
			if (lang === 'blogs') lang = 'en';

			const bp: BlogPost = {
				title: v.title!,
				description: v.description,
				path: v._path!,
				date: v.date,
				duration: v.duration,
				lang,
				id,
			}
			return bp
		})
	});

	return {
		years,
		posts
	}
})

const listItems = ref<HTMLLIElement[]>([]);
const listHeights = ref<number[]>([]);

onMounted(() => {
	listHeights.value = listItems.value.map((el) => el.clientHeight);
});
</script>

<template>
	<div container="~" mx-auto>
		<h1 class="header" mb="2 lg:4" font-800 animated="~ fade-in-up ease-in-out delay-500">{{ t('blogs.title') }}</h1>
		<div text="#999" animated="~ fade-in-up ease-in-out delay-1000">{{ t('blogs.subtitle') }}</div>
		<div flex="~ col" space="y-2" container="~" m="t-8 x-auto">
			<ul>
				<li v-for="(y, i) in blogs.years" :ref="(el) => listItems.push(el as HTMLLIElement)" :key="`blog-${y}`" pb-8
					animated="~ fade-in-up ease-in-out" :style="`animation-delay: ${1300 + 300 * i}ms`">
					<div text="3xl lg:5xl" font="sans 700" mb-4>{{ y }}</div>
					<div flex="~ col" space-y-2>
						<div v-for="blog in blogs.posts[y]" :key="`blog-page-${blog.id}`" class="group" p="" cursor="pointer"
							text="#aaa" @click="router.push(`/blogs/${blog.id}`)">
							<div font="500" text="lg" group-hover:text="#ddd" transition="all duration-150">
								{{ blog.title }}
							</div>
							<div inline-flex items-center space-x-1 font="300 mono" text="sm" group-hover:text="#ddd"
								transition="all duration-150">
								<div class="i-carbon-calendar" text-lg />
								<div>
									{{ dayjs(blog.date).format("D MMM YYYY") || "??" }}
								</div>
								<div>
									•
								</div>
								<div inline-flex class="i-carbon-timer" text-lg />
								<div>{{ blog.duration || "??" }} minute{{ blog.duration > 1 ? 's' : '' }}</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
