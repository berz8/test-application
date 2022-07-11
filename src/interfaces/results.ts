export interface Result {
    id: string;
    description: string;
    alt_description: string;
    urls: {
        regular: string;
    }
    liked?: boolean;
}

export interface Results {
    results: Result[];
    total: number;
    total_pages: number;
}