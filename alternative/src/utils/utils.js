async function fetchAndDecompressGZFile(url, type) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch "${url}": ${response.status} ${response.statusText}`
            );
        }

        const compressed = await response.arrayBuffer();

        const ds = new DecompressionStream("gzip");

        const decompressedStream = new Blob([compressed])
            .stream()
            .pipeThrough(ds);

        const data = await new Response(decompressedStream).arrayBuffer();

        const blob = new Blob([data], { type: type });
        return URL.createObjectURL(blob);
    } catch (err) {
        throw new Error(
            `Unable to fetch and decompress "${url}": ${err.message}`
        );
    }
}

export async function importJS(url) {
    const gz_url = `${url}.gz`;
    let js_url;

    try {
        js_url = await fetchAndDecompressGZFile(
            gz_url,
            "text/javascript"
        );

        return await import(js_url);
    } catch (err) {
        throw new Error(`Failed to import module "${url}": ${err.message}`);
    } finally {
        if (js_url) {
            URL.revokeObjectURL(jsUrl);
        }
    }
}
