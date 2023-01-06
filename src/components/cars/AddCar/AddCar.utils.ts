export const sendFile = (
	{ url, fields }: { url: string; fields: Record<string, string> },
	file: File,
	cb: (progress: number) => any,
) => {
	const request = new XMLHttpRequest();
	request.open('POST', url);

	request.upload.addEventListener('progress', function (e) {
		const progress = (e.loaded / e.total) * 100;
		cb(progress);
	});

	const form = new FormData();
	Object.keys(fields).forEach(key => form.append(key, fields[key]));
	form.append('file', file);

	request.send(form);

	return new Promise((resolve, reject) => {
		request.addEventListener('load', resolve);
		request.addEventListener('error', reject);
	});
};
