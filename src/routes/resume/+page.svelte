<script lang="ts">
	import WorkExperience from '$lib/components/WorkExperience.svelte';
</script>

<svelte:head>
	<title>Resume</title>
</svelte:head>

<article class="mx-auto flex max-w-prose flex-col gap-4">
	<section class="flex flex-col gap-2 text-center">
		<h1 class="text-3xl font-bold">Henry Chukwuemeka Ihenacho</h1>

		<p class="text-sm">
			<a href="https://github.com/henrychris" class="text-blue-500 underline hover:text-blue-700">
				Github
			</a>
			|
			<a href="mailto:henrychris2003@gmail.com" class="text-blue-500 underline hover:text-blue-700">
				henrychris2003@gmail.com
			</a>
			|
			<a
				href="https://www.linkedin.com/in/henry-ihenacho"
				class="text-blue-500 underline hover:text-blue-700"
			>
				Linkedin
			</a>
			|
			<a href="https://medium.com/@hiddenhenry" class="text-blue-500 underline hover:text-blue-700">
				Medium
			</a>
		</p>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="border-b border-gray-200 pb-2 text-2xl font-semibold">Education</h2>
		<div>
			<p class="leading-relaxed">
				<strong class="font-semibold">Covenant University</strong> — Ogun, NG<br />
				<em class="text-gray-600">Bsc. Management Information Systems</em><br />
				Aug 2022
			</p>
		</div>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="border-b border-gray-200 pb-2 text-2xl font-semibold">Work Experience</h2>
		<WorkExperience
			company="BrosPhoneParts"
			role="Backend Engineer"
			period="Nov 2024 - Present"
			location="New York, US"
		>
			<ul>
				<li>
					Implemented a comprehensive product import/export feature with real-time progress tracking
					via WebSockets, background processing for large files, and robust CSV validation.
				</li>
				<li>
					Optimized a critical customer data endpoint by replacing an N+1 query pattern with a
					single MongoDB aggregation pipeline, reducing database queries from 200+ to 1 and cutting
					P90 response time to under 1.6 seconds.
				</li>
				<li>
					Dramatically improved developer productivity by re-architecting the build process with
					SWC, slashing project transpilation times from over 90 seconds to under 2 seconds.
				</li>
			</ul>
		</WorkExperience>

		<WorkExperience
			company="Lights On Heights (Limestone)"
			role="Lead Backend Engineer"
			period="Feb 2024 - Sep 2024"
			location="Lagos, NG"
		>
			<ul>
				<li>
					Led migration to Limestone 2.0, transitioning from a monolith to a microservices
					architecture using C# and a custom-built NATS library for inter-service communication
				</li>
				<li>
					Configured a local Docker environment to run Limestone 2.0 during a lengthy API gateway
					downtime, enabling continuous frontend and mobile development and saving 4 weeks of
					development time
				</li>
				<li>
					Integrated Azure App Configuration for centralized configuration management, enhancing
					security by removing secrets from workflow files and streamlining developer onboarding
				</li>
				<li>Setup observability and monitoring using Azure App Insights, Serilog, and OTEL.</li>
			</ul>
		</WorkExperience>

		<WorkExperience
			company="ErrandPay"
			role="Backend Engineer"
			period="Feb 2023 - Oct 2023"
			location="Lagos, NG"
		>
			<ul>
				<li>
					Developed a reusable service for partner onboarding using C#, reducing onboarding time
					from 1 day to 2 minutes
				</li>
				<li>
					Improved webhook notification reliability by implementing the Outbox pattern in C#,
					eliminating customer complaints about notification drop-offs, previously occurring twice
					weekly
				</li>
				<li>
					Automated monthly goal-alignment reporting by converting manual SQL scripts to C# code,
					ensuring timely, accurate data for meetings and saving hours of manual effort
				</li>
				<li>
					Optimized user profile and dashboard requests both in C# and SQL stored procedures,
					leading to near-instant page load times and eliminating frequent reloads due to timeouts
				</li>
			</ul>
		</WorkExperience>

		<WorkExperience
			company="Fuelmetrics"
			role="Backend Engineer - Internship"
			period="May 2021 - Oct 2021"
			location="Lagos, NG"
		>
			<ul>
				<li>
					Built an API using .NET and iText7 to automate PDF report generation across the company
					portal, improving report accuracy and reducing manual effort
				</li>
				<li>
					Developed and hosted a Telegram bot using .NET and Heroku, allowing users to access the
					company portal directly from Telegram, enhancing user engagement
				</li>
			</ul>
		</WorkExperience>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="border-b border-gray-200 pb-2 text-2xl font-semibold">Projects</h2>

		<div>
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-semibold">QSet</h3>
				<a
					href="https://qset.qballxi.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-blue-500 underline hover:text-blue-700">Project Link</a
				>
			</div>
			<p class="leading-relaxed">
				A tool for football players in my country to manage their games. Currently live with 20
				users a week.
			</p>
		</div>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="border-b border-gray-200 pb-2 text-2xl font-semibold">Technical Skills</h2>
		<p class="leading-relaxed">
			<strong class="font-semibold">Languages:</strong> C#, TypeScript, JavaScript, HTML, SQL, C,
			CSS<br />
			<strong class="font-semibold">Frameworks:</strong> .NET, Express, Fastify, Svelte<br />
			<strong class="font-semibold">Other Technologies:</strong> Azure, Docker, RabbitMQ, NATS, FusionAuth,
			Node, Bun, OpenTelemetry, GitHub Actions
		</p>
	</section>
</article>
