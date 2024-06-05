<script lang="ts">
    export let data

    $: console.log({data});

</script>

<h1>blog</h1>

<ul>
    {#each data.summaries as {slug, title} }
        <li><a href="/blog/{slug}">{title}</a></li>
    {/each}
</ul>
