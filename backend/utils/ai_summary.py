import os
import google.generativeai as genai

# Configure Gemini
api_key = os.environ.get("GEMINI_API_KEY", "MOCK_KEY_FOR_MVP")
if api_key != "MOCK_KEY_FOR_MVP":
    genai.configure(api_key=api_key)

def generate_ai_summary(analysis_results: dict):
    if api_key == "MOCK_KEY_FOR_MVP":
        return "This is a mock AI summary. To get real summaries, provide a valid GEMINI_API_KEY."
        
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
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating summary: {str(e)}"
