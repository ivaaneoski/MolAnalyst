import math

def calculate_distance(coord1, coord2):
    return math.sqrt(sum((c1 - c2) ** 2 for c1, c2 in zip(coord1, coord2)))

def parse_pdb(pdb_text: str, target_ligand: str = None):
    # This is a simplified PDB parser for MVP
    atoms = []
    for line in pdb_text.splitlines():
        if line.startswith("ATOM  ") or line.startswith("HETATM"):
            try:
                # Basic PDB column format parsing
                atom_name = line[12:16].strip()
                res_name = line[17:20].strip()
                chain_id = line[21]
                res_seq = int(line[22:26])
                x = float(line[30:38])
                y = float(line[38:46])
                z = float(line[46:54])
                element = line[76:78].strip() if len(line) >= 78 else atom_name[0]
                
                atoms.append({
                    "is_hetatm": line.startswith("HETATM"),
                    "atom_name": atom_name,
                    "res_name": res_name,
                    "chain_id": chain_id,
                    "res_seq": res_seq,
                    "coord": (x, y, z),
                    "element": element,
                    "line": line
                })
            except Exception:
                continue

    # VERY simplified analysis logic.
    # In a real tool, we'd identify the ligand and find contacts properly.
    ligands = list(set([a["res_name"] for a in atoms if a["is_hetatm"] and a["res_name"] != "HOH"]))
    selected_ligand = target_ligand if target_ligand else (ligands[0] if ligands else None)
    
    if not selected_ligand:
        return {
            "status": "error",
            "message": "No ligand found."
        }

    ligand_atoms = [a for a in atoms if a["res_name"] == selected_ligand]
    protein_atoms = [a for a in atoms if not a["is_hetatm"]]

    h_bonds = []
    hydrophobic = []
    
    # Just find some mock distances for demonstration due to complexity of real bond detection
    for la in ligand_atoms:
        for pa in protein_atoms:
            dist = calculate_distance(la["coord"], pa["coord"])
            if dist < 3.5 and (la["element"] in ["N", "O"]) and (pa["element"] in ["N", "O"]):
                h_bonds.append({"dist": dist, "ligand_atom": la, "protein_atom": pa})
            elif dist < 4.5 and la["element"] == "C" and pa["element"] == "C":
                hydrophobic.append({"dist": dist, "ligand_atom": la, "protein_atom": pa})
                
    # Sort and group logic would go here.
    return {
        "status": "success",
        "ligand": selected_ligand,
        "h_bonds_count": len(h_bonds),
        "hydrophobic_count": len(hydrophobic),
        "pi_stacking_count": 0, # Mocked
        "electrostatic_count": 0, # Mocked
        "pocket_residues": [], # Mocked
        "summary": "Parsed MVP dataset"
    }
