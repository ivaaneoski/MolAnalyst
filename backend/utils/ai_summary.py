import os
import google.generativeai as genai

# Configure Gemini default
default_api_key = os.environ.get("GEMINI_API_KEY", "MOCK_KEY_FOR_MVP")

def generate_ai_summary(analysis_results: dict, custom_api_key: str = None):
    key_to_use = custom_api_key or default_api_key
    
    if key_to_use == "MOCK_KEY_FOR_MVP":
        return "**Binding Profile:** Strong overall interaction driven by key hydrogen bonds with SER 45 and ASP 112. The hydrophobic pocket formed by VAL 23 perfectly complements the ligand's lipophilic tail. *This is a mock AI summary. Provide a valid GEMINI_API_KEY for true generative analysis.*"
        
    prompt = f"""
    Analyze the following protein-ligand interaction data:
    Ligand: {analysis_results.get('ligand')}
    H-bonds: {analysis_results.get('h_bonds_count')}
    Hydrophobic contacts: {analysis_results.get('hydrophobic_count')}
    
    Provide a concise scientific interpretation of this binding profile, including:
    1. Overall Binding Assessment
    2. Key Interaction Highlights
    3. Medicinal Chemistry Suggestions
    Keep it professional and formatted in markdown.
    """
    
    try:
        genai.configure(api_key=key_to_use)
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating summary: {str(e)}"
