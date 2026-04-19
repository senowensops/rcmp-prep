type FilterValue = string | number | boolean | null;
type RowValue = string | number | boolean | null | Record<string, unknown> | unknown[];
type Row = Record<string, RowValue>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getHeaders(prefer: string) {
  return {
    "Content-Type": "application/json",
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    Prefer: prefer,
  };
}

class SupabaseUpdateBuilder {
  private readonly filters = new URLSearchParams();

  constructor(
    private readonly table: string,
    private readonly values: Row
  ) {}

  eq(column: string, value: FilterValue) {
    this.filters.set(column, `eq.${String(value)}`);
    return this;
  }

  is(column: string, value: FilterValue) {
    this.filters.set(column, `is.${value === null ? "null" : String(value)}`);
    return this.execute();
  }

  async execute() {
    if (!supabaseUrl || !supabaseAnonKey) {
      return;
    }

    const query = this.filters.toString();
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${this.table}${query ? `?${query}` : ""}`,
      {
        method: "PATCH",
        headers: getHeaders("return=minimal"),
        body: JSON.stringify(this.values),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Supabase update failed: ${response.status} ${response.statusText}`
      );
    }
  }
}

class SupabaseTableClient {
  constructor(private readonly table: string) {}

  async insert(values: Row) {
    if (!supabaseUrl || !supabaseAnonKey) {
      return;
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/${this.table}`, {
      method: "POST",
      headers: getHeaders("return=minimal"),
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(
        `Supabase insert failed: ${response.status} ${response.statusText}`
      );
    }
  }

  update(values: Row) {
    return new SupabaseUpdateBuilder(this.table, values);
  }
}

export const supabase = {
  from(table: string) {
    return new SupabaseTableClient(table);
  },
};
